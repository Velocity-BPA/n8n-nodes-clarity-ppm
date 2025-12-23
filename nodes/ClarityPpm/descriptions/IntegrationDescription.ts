/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const integrationOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['integration'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new integration record',
        action: 'Create an integration',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get an integration by ID',
        action: 'Get an integration',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get multiple integrations',
        action: 'Get many integrations',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an integration',
        action: 'Update an integration',
      },
    ],
    default: 'getMany',
  },
];

export const integrationFields: INodeProperties[] = [
  // ----------------------------------
  //         integration:create
  // ----------------------------------
  {
    displayName: 'Integration Data',
    name: 'integrationData',
    type: 'json',
    required: true,
    default: '{}',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['create'],
      },
    },
    description: 'JSON object containing integration record data',
  },

  // ----------------------------------
  //         integration:get/update
  // ----------------------------------
  {
    displayName: 'Integration ID',
    name: 'integrationId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['get', 'update'],
      },
    },
    description: 'The internal ID of the integration',
  },

  // ----------------------------------
  //         integration:getMany
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['getMany'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['getMany'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500,
    },
    default: 50,
    description: 'Max number of results to return',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['getMany', 'get'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        description: 'Comma-separated list of fields to return',
      },
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        description: 'Clarity filter expression',
      },
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'string',
        default: '',
        description: 'Sort order (field name followed by asc or desc)',
      },
    ],
  },

  // ----------------------------------
  //         integration:update
  // ----------------------------------
  {
    displayName: 'Update Data',
    name: 'updateData',
    type: 'json',
    required: true,
    default: '{}',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['update'],
      },
    },
    description: 'JSON object containing fields to update',
  },
];
