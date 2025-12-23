/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const teamOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['team'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new team',
        action: 'Create a team',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a team',
        action: 'Delete a team',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a team by ID',
        action: 'Get a team',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get multiple teams',
        action: 'Get many teams',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a team',
        action: 'Update a team',
      },
    ],
    default: 'getMany',
  },
];

export const teamFields: INodeProperties[] = [
  // ----------------------------------
  //         team:create
  // ----------------------------------
  {
    displayName: 'Team Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['create'],
      },
    },
    description: 'Name of the team',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['team'],
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
        description: 'Team description',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the team is active',
      },
    ],
  },

  // ----------------------------------
  //         team:get/update/delete
  // ----------------------------------
  {
    displayName: 'Team ID',
    name: 'teamId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'The internal ID of the team',
  },

  // ----------------------------------
  //         team:getMany
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['team'],
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
        resource: ['team'],
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
        resource: ['team'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        placeholder: "(isActive = true)",
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
        displayName: 'Name Contains',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Filter by team name (contains)',
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
        resource: ['team'],
        operation: ['getMany', 'get'],
      },
    },
    options: [
      {
        displayName: 'Expand',
        name: 'expand',
        type: 'string',
        default: '',
        placeholder: 'teamdefinitions,teamdefallocations',
        description: 'Comma-separated list of sub-resources to expand inline',
      },
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        placeholder: 'name,description,isActive',
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
  //         team:update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['team'],
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
        description: 'Team description',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the team is active',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Team name',
      },
    ],
  },
];
