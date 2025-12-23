/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const roadmapOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['roadmap'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new roadmap',
        action: 'Create a roadmap',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a roadmap by ID',
        action: 'Get a roadmap',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get multiple roadmaps',
        action: 'Get many roadmaps',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a roadmap',
        action: 'Update a roadmap',
      },
    ],
    default: 'getMany',
  },
];

export const roadmapFields: INodeProperties[] = [
  // ----------------------------------
  //         roadmap:create
  // ----------------------------------
  {
    displayName: 'Roadmap Code',
    name: 'code',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['roadmap'],
        operation: ['create'],
      },
    },
    description: 'Unique roadmap code identifier',
  },
  {
    displayName: 'Roadmap Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['roadmap'],
        operation: ['create'],
      },
    },
    description: 'Name of the roadmap',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['roadmap'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Author ID',
        name: 'author',
        type: 'number',
        default: 0,
        description: 'Internal ID of the author resource',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Roadmap description',
      },
      {
        displayName: 'Duration',
        name: 'duration',
        type: 'number',
        default: 0,
        description: 'Duration in periods',
      },
      {
        displayName: 'Finish Date',
        name: 'finishDate',
        type: 'dateTime',
        default: '',
        description: 'Roadmap finish date (ISO 8601 format)',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        description: 'Roadmap start date (ISO 8601 format)',
      },
      {
        displayName: 'Start Period',
        name: 'startPeriod',
        type: 'number',
        default: 0,
        description: 'Start period ID',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Draft', value: 'DRAFT' },
          { name: 'Approved', value: 'APPROVED' },
          { name: 'Rejected', value: 'REJECTED' },
          { name: 'In Review', value: 'IN_REVIEW' },
        ],
        default: 'DRAFT',
        description: 'Roadmap status',
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
          { name: 'Investment', value: 'INVESTMENT' },
          { name: 'Resource', value: 'RESOURCE' },
          { name: 'Custom', value: 'CUSTOM' },
        ],
        default: 'INVESTMENT',
        description: 'Roadmap type',
      },
    ],
  },

  // ----------------------------------
  //         roadmap:get/update
  // ----------------------------------
  {
    displayName: 'Roadmap ID',
    name: 'roadmapId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['roadmap'],
        operation: ['get', 'update'],
      },
    },
    description: 'The internal ID of the roadmap',
  },

  // ----------------------------------
  //         roadmap:getMany
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['roadmap'],
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
        resource: ['roadmap'],
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
        resource: ['roadmap'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Author ID',
        name: 'author',
        type: 'number',
        default: 0,
        description: 'Filter by author resource ID',
      },
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        placeholder: "(status = 'APPROVED')",
        description: 'Clarity filter expression',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Draft', value: 'DRAFT' },
          { name: 'Approved', value: 'APPROVED' },
          { name: 'Rejected', value: 'REJECTED' },
          { name: 'In Review', value: 'IN_REVIEW' },
        ],
        default: 'DRAFT',
        description: 'Filter by status',
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
          { name: 'Investment', value: 'INVESTMENT' },
          { name: 'Resource', value: 'RESOURCE' },
          { name: 'Custom', value: 'CUSTOM' },
        ],
        default: 'INVESTMENT',
        description: 'Filter by type',
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
        resource: ['roadmap'],
        operation: ['getMany', 'get'],
      },
    },
    options: [
      {
        displayName: 'Expand',
        name: 'expand',
        type: 'string',
        default: '',
        placeholder: 'roadmapItems,scenarios',
        description: 'Comma-separated list of sub-resources to expand inline',
      },
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        placeholder: 'code,name,status,type',
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
  //         roadmap:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['roadmap'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Author ID',
        name: 'author',
        type: 'number',
        default: 0,
        description: 'Internal ID of the author resource',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Roadmap description',
      },
      {
        displayName: 'Duration',
        name: 'duration',
        type: 'number',
        default: 0,
        description: 'Duration in periods',
      },
      {
        displayName: 'Finish Date',
        name: 'finishDate',
        type: 'dateTime',
        default: '',
        description: 'Roadmap finish date',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Roadmap name',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        description: 'Roadmap start date',
      },
      {
        displayName: 'Start Period',
        name: 'startPeriod',
        type: 'number',
        default: 0,
        description: 'Start period ID',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Draft', value: 'DRAFT' },
          { name: 'Approved', value: 'APPROVED' },
          { name: 'Rejected', value: 'REJECTED' },
          { name: 'In Review', value: 'IN_REVIEW' },
        ],
        default: 'DRAFT',
        description: 'Roadmap status',
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
          { name: 'Investment', value: 'INVESTMENT' },
          { name: 'Resource', value: 'RESOURCE' },
          { name: 'Custom', value: 'CUSTOM' },
        ],
        default: 'INVESTMENT',
        description: 'Roadmap type',
      },
    ],
  },
];
