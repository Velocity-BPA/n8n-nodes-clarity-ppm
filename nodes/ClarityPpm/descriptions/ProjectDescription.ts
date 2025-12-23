/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const projectOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['project'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new project',
        action: 'Create a project',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a project',
        action: 'Delete a project',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a project by ID',
        action: 'Get a project',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get multiple projects',
        action: 'Get many projects',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a project',
        action: 'Update a project',
      },
    ],
    default: 'getMany',
  },
];

export const projectFields: INodeProperties[] = [
  // ----------------------------------
  //         project:create
  // ----------------------------------
  {
    displayName: 'Project Code',
    name: 'code',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['create'],
      },
    },
    description: 'Unique project code identifier',
  },
  {
    displayName: 'Project Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['create'],
      },
    },
    description: 'Name of the project',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Cost Type',
        name: 'costType',
        type: 'string',
        default: '',
        description: 'Cost type lookup value',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Project description',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the project is active',
      },
      {
        displayName: 'Manager ID',
        name: 'manager',
        type: 'number',
        default: 0,
        description: 'Internal ID of the project manager resource',
      },
      {
        displayName: 'Percent Complete',
        name: 'percentComplete',
        type: 'number',
        typeOptions: {
          minValue: 0,
          maxValue: 100,
        },
        default: 0,
        description: 'Project completion percentage (0-100)',
      },
      {
        displayName: 'Priority',
        name: 'priority',
        type: 'number',
        default: 0,
        description: 'Priority number for the project',
      },
      {
        displayName: 'Progress',
        name: 'progress',
        type: 'string',
        default: '',
        description: 'Progress lookup value',
      },
      {
        displayName: 'Schedule Finish',
        name: 'scheduleFinish',
        type: 'dateTime',
        default: '',
        description: 'Scheduled end date (ISO 8601 format)',
      },
      {
        displayName: 'Schedule Start',
        name: 'scheduleStart',
        type: 'dateTime',
        default: '',
        description: 'Scheduled start date (ISO 8601 format)',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'string',
        default: '',
        description: 'Status lookup value',
      },
    ],
  },

  // ----------------------------------
  //         project:get
  // ----------------------------------
  {
    displayName: 'Project ID',
    name: 'projectId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'The internal ID of the project',
  },

  // ----------------------------------
  //         project:getMany
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['project'],
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
        resource: ['project'],
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
        resource: ['project'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        placeholder: "(isActive = true) and (priority > 5)",
        description: 'Clarity filter expression',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Filter by active status',
      },
      {
        displayName: 'Manager ID',
        name: 'manager',
        type: 'number',
        default: 0,
        description: 'Filter by manager resource ID',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'string',
        default: '',
        description: 'Filter by status value',
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
        resource: ['project'],
        operation: ['getMany', 'get'],
      },
    },
    options: [
      {
        displayName: 'Expand',
        name: 'expand',
        type: 'string',
        default: '',
        placeholder: 'tasks,teams',
        description: 'Comma-separated list of sub-resources to expand inline',
      },
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        placeholder: 'code,name,isActive,scheduleStart',
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
  //         project:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Cost Type',
        name: 'costType',
        type: 'string',
        default: '',
        description: 'Cost type lookup value',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Project description',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the project is active',
      },
      {
        displayName: 'Manager ID',
        name: 'manager',
        type: 'number',
        default: 0,
        description: 'Internal ID of the project manager resource',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Project name',
      },
      {
        displayName: 'Percent Complete',
        name: 'percentComplete',
        type: 'number',
        typeOptions: {
          minValue: 0,
          maxValue: 100,
        },
        default: 0,
        description: 'Project completion percentage (0-100)',
      },
      {
        displayName: 'Priority',
        name: 'priority',
        type: 'number',
        default: 0,
        description: 'Priority number',
      },
      {
        displayName: 'Progress',
        name: 'progress',
        type: 'string',
        default: '',
        description: 'Progress lookup value',
      },
      {
        displayName: 'Schedule Finish',
        name: 'scheduleFinish',
        type: 'dateTime',
        default: '',
        description: 'Scheduled end date (ISO 8601 format)',
      },
      {
        displayName: 'Schedule Start',
        name: 'scheduleStart',
        type: 'dateTime',
        default: '',
        description: 'Scheduled start date (ISO 8601 format)',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'string',
        default: '',
        description: 'Status lookup value',
      },
    ],
  },
];
