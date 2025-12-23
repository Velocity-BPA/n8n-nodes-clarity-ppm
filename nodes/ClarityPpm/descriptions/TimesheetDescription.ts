/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const timesheetOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['timesheet'],
      },
    },
    options: [
      {
        name: 'Approve',
        value: 'approve',
        description: 'Approve a submitted timesheet',
        action: 'Approve a timesheet',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new timesheet',
        action: 'Create a timesheet',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a timesheet',
        action: 'Delete a timesheet',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a timesheet by ID',
        action: 'Get a timesheet',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get multiple timesheets',
        action: 'Get many timesheets',
      },
      {
        name: 'Submit',
        value: 'submit',
        description: 'Submit a timesheet for approval',
        action: 'Submit a timesheet',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a timesheet',
        action: 'Update a timesheet',
      },
    ],
    default: 'getMany',
  },
];

export const timesheetFields: INodeProperties[] = [
  // ----------------------------------
  //         timesheet:create
  // ----------------------------------
  {
    displayName: 'Resource ID',
    name: 'resourceId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['timesheet'],
        operation: ['create'],
      },
    },
    description: 'The internal ID of the resource (employee)',
  },
  {
    displayName: 'Period Start',
    name: 'periodStart',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['timesheet'],
        operation: ['create'],
      },
    },
    description: 'Start date of the timesheet period (ISO 8601 format)',
  },
  {
    displayName: 'Period Finish',
    name: 'periodFinish',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['timesheet'],
        operation: ['create'],
      },
    },
    description: 'End date of the timesheet period (ISO 8601 format)',
  },

  // ----------------------------------
  //         timesheet:get/update/delete/submit/approve
  // ----------------------------------
  {
    displayName: 'Timesheet ID',
    name: 'timesheetId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['timesheet'],
        operation: ['get', 'update', 'delete', 'submit', 'approve'],
      },
    },
    description: 'The internal ID of the timesheet',
  },

  // ----------------------------------
  //         timesheet:getMany
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['timesheet'],
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
        resource: ['timesheet'],
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
        resource: ['timesheet'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        placeholder: '(status = 0)',
        description: 'Clarity filter expression',
      },
      {
        displayName: 'Resource ID',
        name: 'resourceId',
        type: 'number',
        default: 0,
        description: 'Filter by resource (employee) ID',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Open', value: 0 },
          { name: 'Submitted', value: 1 },
          { name: 'Returned', value: 2 },
          { name: 'Approved', value: 3 },
        ],
        default: 0,
        description: 'Filter by timesheet status',
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
        resource: ['timesheet'],
        operation: ['getMany', 'get'],
      },
    },
    options: [
      {
        displayName: 'Expand',
        name: 'expand',
        type: 'string',
        default: '',
        placeholder: 'timeEntries,timesheetNotes',
        description: 'Comma-separated list of sub-resources to expand inline',
      },
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        placeholder: 'resourceId,periodStart,periodFinish,status',
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
        placeholder: 'periodStart desc',
        description: 'Sort order (field name followed by asc or desc)',
      },
    ],
  },

  // ----------------------------------
  //         timesheet:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['timesheet'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Period Finish',
        name: 'periodFinish',
        type: 'dateTime',
        default: '',
        description: 'End date of the timesheet period',
      },
      {
        displayName: 'Period Start',
        name: 'periodStart',
        type: 'dateTime',
        default: '',
        description: 'Start date of the timesheet period',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Open', value: 0 },
          { name: 'Submitted', value: 1 },
          { name: 'Returned', value: 2 },
          { name: 'Approved', value: 3 },
        ],
        default: 0,
        description: 'Timesheet status',
      },
    ],
  },

  // ----------------------------------
  //         timesheet: Time Entry sub-resource
  // ----------------------------------
  {
    displayName: 'Time Entry Operation',
    name: 'timeEntryOperation',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['timesheet'],
        operation: ['get'],
      },
    },
    options: [
      {
        name: 'None',
        value: 'none',
        description: 'Do not perform any time entry operation',
      },
      {
        name: 'Get Time Entries',
        value: 'getTimeEntries',
        description: 'Get all time entries for this timesheet',
      },
    ],
    default: 'none',
    description: 'Optional operation on time entries',
  },
];
