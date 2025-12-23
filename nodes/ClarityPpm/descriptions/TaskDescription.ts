/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['task'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new task',
        action: 'Create a task',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a task',
        action: 'Delete a task',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a task by ID',
        action: 'Get a task',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get multiple tasks for a project',
        action: 'Get many tasks',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a task',
        action: 'Update a task',
      },
    ],
    default: 'getMany',
  },
];

export const taskFields: INodeProperties[] = [
  // ----------------------------------
  //         task: all operations
  // ----------------------------------
  {
    displayName: 'Project ID',
    name: 'projectId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['task'],
      },
    },
    description: 'The internal ID of the parent project',
  },

  // ----------------------------------
  //         task:create
  // ----------------------------------
  {
    displayName: 'Task Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['task'],
        operation: ['create'],
      },
    },
    description: 'Name of the task',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['task'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'Task code identifier',
      },
      {
        displayName: 'Cost Type',
        name: 'costType',
        type: 'string',
        default: '',
        description: 'Cost type lookup value',
      },
      {
        displayName: 'Finish Date',
        name: 'finishDate',
        type: 'dateTime',
        default: '',
        description: 'Task finish date (ISO 8601 format)',
      },
      {
        displayName: 'Is Milestone',
        name: 'milestone',
        type: 'boolean',
        default: false,
        description: 'Whether this task is a milestone',
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
        description: 'Task completion percentage (0-100)',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        description: 'Task start date (ISO 8601 format)',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'string',
        default: '',
        description: 'Task status lookup value',
      },
    ],
  },

  // ----------------------------------
  //         task:get/update/delete
  // ----------------------------------
  {
    displayName: 'Task ID',
    name: 'taskId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['task'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'The internal ID of the task',
  },

  // ----------------------------------
  //         task:getMany
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['task'],
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
        resource: ['task'],
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
        resource: ['task'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        placeholder: "(status = 'In Progress')",
        description: 'Clarity filter expression',
      },
      {
        displayName: 'Is Milestone',
        name: 'milestone',
        type: 'boolean',
        default: false,
        description: 'Filter by milestone status',
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
        resource: ['task'],
        operation: ['getMany', 'get'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        placeholder: 'code,name,startDate,finishDate',
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
        placeholder: 'startDate asc',
        description: 'Sort order (field name followed by asc or desc)',
      },
    ],
  },

  // ----------------------------------
  //         task:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['task'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'Task code identifier',
      },
      {
        displayName: 'Cost Type',
        name: 'costType',
        type: 'string',
        default: '',
        description: 'Cost type lookup value',
      },
      {
        displayName: 'Finish Date',
        name: 'finishDate',
        type: 'dateTime',
        default: '',
        description: 'Task finish date (ISO 8601 format)',
      },
      {
        displayName: 'Is Milestone',
        name: 'milestone',
        type: 'boolean',
        default: false,
        description: 'Whether this task is a milestone',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Task name',
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
        description: 'Task completion percentage (0-100)',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        description: 'Task start date (ISO 8601 format)',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'string',
        default: '',
        description: 'Task status lookup value',
      },
    ],
  },
];
