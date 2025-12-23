/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const lookupOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['lookup'],
      },
    },
    options: [
      {
        name: 'Get Values',
        value: 'getValues',
        description: 'Get lookup values for a specific lookup code',
        action: 'Get lookup values',
      },
    ],
    default: 'getValues',
  },
];

export const lookupFields: INodeProperties[] = [
  // ----------------------------------
  //         lookup:getValues
  // ----------------------------------
  {
    displayName: 'Lookup Code',
    name: 'lookupCode',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'INVESTMENT_OBJ_STATUS',
    displayOptions: {
      show: {
        resource: ['lookup'],
        operation: ['getValues'],
      },
    },
    description: 'The lookup code to retrieve values for. Common codes include: prTrackMode, BROWSE_PROJMGR, LOOKUP_FIN_COSTTYPECODE, INVESTMENT_OBJ_STATUS, INVESTMENT_OBJ_PROGRESS, LOOKUP_ACTIVE_CURRENCIES.',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['lookup'],
        operation: ['getValues'],
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
        resource: ['lookup'],
        operation: ['getValues'],
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
        resource: ['lookup'],
        operation: ['getValues'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        placeholder: 'id,name,description,isActive',
        description: 'Comma-separated list of fields to return',
      },
      {
        displayName: 'Filter Active Only',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether to only return active lookup values',
      },
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        placeholder: "(name contains 'Active')",
        description: 'Clarity filter expression',
      },
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'string',
        default: '',
        placeholder: 'name asc',
        description: 'Sort order (field name followed by asc or desc)',
      },
    ],
  },
];
