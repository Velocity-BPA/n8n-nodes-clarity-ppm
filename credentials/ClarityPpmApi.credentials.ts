/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IAuthenticateGeneric,
  ICredentialDataDecryptedObject,
  ICredentialTestRequest,
  ICredentialType,
  IHttpRequestHelper,
  INodeProperties,
} from 'n8n-workflow';

export class ClarityPpmApi implements ICredentialType {
  name = 'clarityPpmApi';
  displayName = 'Clarity PPM API';
  documentationUrl = 'https://techdocs.broadcom.com/clarity';
  properties: INodeProperties[] = [
    {
      displayName: 'Host URL',
      name: 'host',
      type: 'string',
      default: '',
      placeholder: 'https://clarity.example.com:8080',
      required: true,
      description: 'The base URL of your Clarity PPM instance (including port if not standard)',
    },
    {
      displayName: 'Authentication Type',
      name: 'authType',
      type: 'options',
      options: [
        {
          name: 'API Key (Bearer Token)',
          value: 'apiKey',
          description: 'Recommended for production - uses JWT API key',
        },
        {
          name: 'Basic Auth',
          value: 'basic',
          description: 'Username and password authentication',
        },
        {
          name: 'Token (Login/Logout)',
          value: 'token',
          description: 'Session-based token authentication',
        },
      ],
      default: 'apiKey',
      description: 'The authentication method to use',
    },
    {
      displayName: 'Username',
      name: 'username',
      type: 'string',
      default: '',
      displayOptions: {
        show: {
          authType: ['basic', 'token'],
        },
      },
      description: 'Your Clarity PPM username',
    },
    {
      displayName: 'Password',
      name: 'password',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      displayOptions: {
        show: {
          authType: ['basic', 'token'],
        },
      },
      description: 'Your Clarity PPM password',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      displayOptions: {
        show: {
          authType: ['apiKey'],
        },
      },
      description: 'The JWT API key generated in Clarity PPM',
    },
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'string',
      default: '',
      displayOptions: {
        show: {
          authType: ['apiKey'],
        },
      },
      placeholder: 'CLIENT_MY-APP',
      description: 'The client application identifier configured in Clarity PPM',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {},
  };

  async preAuthentication(
    this: IHttpRequestHelper,
    credentials: ICredentialDataDecryptedObject,
  ): Promise<ICredentialDataDecryptedObject> {
    const authType = credentials.authType as string;

    if (authType === 'apiKey') {
      return {
        headers: {
          Authorization: `Bearer ${credentials.apiKey}`,
          'x-api-ppm-client': credentials.clientId,
          'Content-Type': 'application/json',
        },
      };
    }

    if (authType === 'basic') {
      const basicAuth = Buffer.from(
        `${credentials.username}:${credentials.password}`,
      ).toString('base64');
      return {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
      };
    }

    if (authType === 'token') {
      const host = (credentials.host as string).replace(/\/$/, '');
      const basicAuth = Buffer.from(
        `${credentials.username}:${credentials.password}`,
      ).toString('base64');

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${host}/ppm/rest/v1/auth/login`,
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        headers: {
          Authorization: response.authToken,
          'Content-Type': 'application/json',
        },
      };
    }

    return {};
  }

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.host}}',
      url: '/ppm/rest/v1/virtual/userProfile',
      method: 'GET',
    },
  };
}
