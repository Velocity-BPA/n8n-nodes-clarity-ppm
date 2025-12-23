/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const resourceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['resource'],
      },
    },
    options: [
      {
        name: 'Get',
        value: 'get',
        description: 'Get a resource by ID',
        action: 'Get a resource',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get multiple resources',
        action: 'Get many resources',
      },
    ],
    default: 'getMany',
  },
];

export const resourceFields: INodeProperties[] = [
  // ----------------------------------
  //         resource:get
  // ----------------------------------
  {
    displayName: 'Resource ID',
    name: 'resourceId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['resource'],
        operation: ['get'],
      },
    },
    description: 'The internal ID of the resource',
  },

  // ----------------------------------
  //         resource:getMany
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['resource'],
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
        resource: ['resource'],
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
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['resource'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        placeholder: 'user@example.com',
        description: 'Filter by email address',
      },
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        placeholder: "(isActive = true)",
        description: 'Clarity filter expression',
      },
      {
        displayName: 'First Name',
        name: 'firstName',
        type: 'string',
        default: '',
        description: 'Filter by first name',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Filter by active status',
      },
      {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        default: '',
        description: 'Filter by last name',
      },
      {
        displayName: 'Resource Type',
        name: 'resourceType',
        type: 'string',
        default: '',
        description: 'Filter by resource type lookup value',
      },
    ],
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['resource'],
        operation: ['getMany', 'get'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        placeholder: 'firstName,lastName,email,isActive',
        description: 'Comma-separated list of fields to return',
      },
      {
        displayName: 'Include Links',
        name: 'links',
        type: 'boolean',
        default: false,
        description: 'Whether to include lookup links in response',
      },
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'string',
        default: '',
        placeholder: 'lastName asc',
        description: 'Sort order (field name followed by asc or desc)',
      },
    ],
  },
];
