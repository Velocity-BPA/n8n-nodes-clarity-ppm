/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  ILoadOptionsFunctions,
  IRequestOptions,
  JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import type { IClarityCredentials, IClarityApiResponse } from './types';

/**
 * Makes an authenticated request to the Clarity PPM REST API
 */
export async function clarityPpmApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  query: IDataObject = {},
  uri?: string,
): Promise<IDataObject> {
  const credentials = (await this.getCredentials('clarityPpmApi')) as IClarityCredentials;
  const host = credentials.host.replace(/\/$/, '');

  const options: IRequestOptions = {
    method,
    body,
    qs: query,
    uri: uri || `${host}/ppm/rest/v1${endpoint}`,
    json: true,
  };

  if (Object.keys(body).length === 0) {
    delete options.body;
  }

  if (Object.keys(query).length === 0) {
    delete options.qs;
  }

  // Add authentication headers based on auth type
  const headers: IDataObject = {
    'Content-Type': 'application/json',
  };

  if (credentials.authType === 'apiKey') {
    headers['Authorization'] = `Bearer ${credentials.apiKey}`;
    headers['x-api-ppm-client'] = credentials.clientId;
  } else if (credentials.authType === 'basic') {
    const basicAuth = Buffer.from(`${credentials.username}:${credentials.password}`).toString(
      'base64',
    );
    headers['Authorization'] = `Basic ${basicAuth}`;
  }

  options.headers = headers;

  try {
    const response = await this.helpers.request(options);
    return response as IDataObject;
  } catch (error) {
    throw new NodeApiError(this.getNode(), error as JsonObject, {
      message: getClarityErrorMessage(error as JsonObject),
    });
  }
}

/**
 * Makes an authenticated request and returns all results using pagination
 */
export async function clarityPpmApiRequestAllItems(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  query: IDataObject = {},
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let responseData: IClarityApiResponse;

  query.limit = query.limit || 100;
  query.offset = 0;

  do {
    responseData = (await clarityPpmApiRequest.call(
      this,
      method,
      endpoint,
      body,
      query,
    )) as IClarityApiResponse;

    if (responseData._results) {
      returnData.push(...responseData._results);
    } else {
      // Single item response
      returnData.push(responseData as IDataObject);
      break;
    }

    query.offset = (query.offset as number) + (query.limit as number);
  } while (responseData._next);

  return returnData;
}

/**
 * Builds a filter expression string from filter parameters
 */
export function buildFilterExpression(filters: IDataObject): string {
  const conditions: string[] = [];

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'string') {
        conditions.push(`(${key} = '${value}')`);
      } else if (typeof value === 'boolean') {
        conditions.push(`(${key} = ${value})`);
      } else if (typeof value === 'number') {
        conditions.push(`(${key} = ${value})`);
      }
    }
  }

  return conditions.length > 0 ? conditions.join(' and ') : '';
}

/**
 * Extracts a meaningful error message from Clarity API error responses
 */
export function getClarityErrorMessage(error: JsonObject): string {
  if (error._errors && Array.isArray(error._errors) && error._errors.length > 0) {
    const firstError = error._errors[0] as { errorMessage?: string; errorCode?: string };
    return firstError.errorMessage || firstError.errorCode || 'Unknown Clarity PPM error';
  }

  if (error.message) {
    return error.message as string;
  }

  if (error.error) {
    if (typeof error.error === 'string') {
      return error.error;
    }
    if (typeof error.error === 'object' && (error.error as JsonObject).message) {
      return (error.error as JsonObject).message as string;
    }
  }

  return 'An unknown error occurred';
}

/**
 * Validates required fields for a create/update operation
 */
export function validateRequiredFields(
  data: IDataObject,
  requiredFields: string[],
  operation: string,
): void {
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required fields for ${operation} operation: ${missingFields.join(', ')}`,
    );
  }
}

/**
 * Converts ISO date string to Clarity date format if needed
 */
export function formatClarityDate(dateString: string): string {
  // Clarity accepts ISO 8601 format, so just validate and return
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateString}`);
  }
  return date.toISOString();
}

/**
 * Simplifies a Clarity API response by extracting just the data
 */
export function simplifyResponse(response: IClarityApiResponse): IDataObject | IDataObject[] {
  if (response._results) {
    return response._results;
  }

  // Remove metadata fields for single object response
  const simplified: IDataObject = {};
  for (const [key, value] of Object.entries(response)) {
    if (!key.startsWith('_') || key === '_internalId') {
      simplified[key] = value;
    }
  }
  return simplified;
}

/**
 * Token manager for session-based authentication
 */
export class ClarityTokenManager {
  private token: string | null = null;
  private credentials: IClarityCredentials;
  private context: IExecuteFunctions | ILoadOptionsFunctions;

  constructor(
    context: IExecuteFunctions | ILoadOptionsFunctions,
    credentials: IClarityCredentials,
  ) {
    this.context = context;
    this.credentials = credentials;
  }

  async login(): Promise<string> {
    const host = this.credentials.host.replace(/\/$/, '');
    const basicAuth = Buffer.from(
      `${this.credentials.username}:${this.credentials.password}`,
    ).toString('base64');

    const response = await this.context.helpers.request({
      method: 'POST',
      uri: `${host}/ppm/rest/v1/auth/login`,
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
      json: true,
    });

    this.token = (response as { authToken: string }).authToken;
    return this.token;
  }

  async logout(): Promise<void> {
    if (!this.token) return;

    const host = this.credentials.host.replace(/\/$/, '');

    try {
      await this.context.helpers.request({
        method: 'DELETE',
        uri: `${host}/ppm/rest/v1/auth/logout`,
        headers: {
          Authorization: this.token,
          'Content-Type': 'application/json',
        },
        json: true,
      });
    } finally {
      this.token = null;
    }
  }

  getToken(): string {
    if (!this.token) {
      throw new Error('Not authenticated. Call login() first.');
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }
}
