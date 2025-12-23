/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const costPlanOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['costPlan'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new cost/budget plan',
        action: 'Create a cost plan',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a cost plan',
        action: 'Delete a cost plan',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a cost plan by ID',
        action: 'Get a cost plan',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get multiple cost plans',
        action: 'Get many cost plans',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a cost plan',
        action: 'Update a cost plan',
      },
    ],
    default: 'getMany',
  },
];

export const costPlanFields: INodeProperties[] = [
  // ----------------------------------
  //         costPlan:create
  // ----------------------------------
  {
    displayName: 'Plan Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['costPlan'],
        operation: ['create'],
      },
    },
    description: 'Name of the cost/budget plan',
  },
  {
    displayName: 'Investment ID',
    name: 'investmentId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['costPlan'],
        operation: ['create'],
      },
    },
    description: 'The internal ID of the investment (project)',
  },
  {
    displayName: 'Plan Type',
    name: 'planType',
    type: 'options',
    required: true,
    options: [
      { name: 'Cost Plan (Forecast)', value: 'FORECAST' },
      { name: 'Budget Plan', value: 'BUDGET' },
    ],
    default: 'FORECAST',
    displayOptions: {
      show: {
        resource: ['costPlan'],
        operation: ['create'],
      },
    },
    description: 'Type of the plan',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['costPlan'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Plan description',
      },
      {
        displayName: 'Is Plan of Record',
        name: 'isPlanOfRecord',
        type: 'boolean',
        default: false,
        description: 'Whether this is the plan of record',
      },
    ],
  },

  // ----------------------------------
  //         costPlan:get/update/delete
  // ----------------------------------
  {
    displayName: 'Cost Plan ID',
    name: 'costPlanId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['costPlan'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'The internal ID of the cost plan',
  },

  // ----------------------------------
  //         costPlan:getMany
  // ----------------------------------
  {
    displayName: 'Investment ID',
    name: 'investmentIdFilter',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['costPlan'],
        operation: ['getMany'],
      },
    },
    description: 'The internal ID of the investment (project) - required filter',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['costPlan'],
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
        resource: ['costPlan'],
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
        resource: ['costPlan'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        placeholder: "(isPlanOfRecord = true)",
        description: 'Additional Clarity filter expression',
      },
      {
        displayName: 'Is Plan of Record',
        name: 'isPlanOfRecord',
        type: 'boolean',
        default: false,
        description: 'Filter by plan of record status',
      },
      {
        displayName: 'Plan Type',
        name: 'planType',
        type: 'options',
        options: [
          { name: 'Cost Plan (Forecast)', value: 'FORECAST' },
          { name: 'Budget Plan', value: 'BUDGET' },
        ],
        default: 'FORECAST',
        description: 'Filter by plan type',
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
        resource: ['costPlan'],
        operation: ['getMany', 'get'],
      },
    },
    options: [
      {
        displayName: 'Expand',
        name: 'expand',
        type: 'string',
        default: '',
        placeholder: 'costplandetails',
        description: 'Comma-separated list of sub-resources to expand inline',
      },
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        placeholder: 'name,planType,isPlanOfRecord',
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
        placeholder: 'name asc',
        description: 'Sort order (field name followed by asc or desc)',
      },
    ],
  },

  // ----------------------------------
  //         costPlan:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['costPlan'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Plan description',
      },
      {
        displayName: 'Is Plan of Record',
        name: 'isPlanOfRecord',
        type: 'boolean',
        default: false,
        description: 'Whether this is the plan of record',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Plan name',
      },
    ],
  },
];
