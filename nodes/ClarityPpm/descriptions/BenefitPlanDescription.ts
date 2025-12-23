/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const benefitPlanOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['benefitPlan'],
      },
    },
    options: [
      {
        name: 'Get',
        value: 'get',
        description: 'Get a benefit plan by ID',
        action: 'Get a benefit plan',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get multiple benefit plans',
        action: 'Get many benefit plans',
      },
    ],
    default: 'getMany',
  },
];

export const benefitPlanFields: INodeProperties[] = [
  // ----------------------------------
  //         benefitPlan:get
  // ----------------------------------
  {
    displayName: 'Benefit Plan ID',
    name: 'benefitPlanId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['benefitPlan'],
        operation: ['get'],
      },
    },
    description: 'The internal ID of the benefit plan',
  },

  // ----------------------------------
  //         benefitPlan:getMany
  // ----------------------------------
  {
    displayName: 'Investment ID',
    name: 'investmentId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['benefitPlan'],
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
        resource: ['benefitPlan'],
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
        resource: ['benefitPlan'],
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
        resource: ['benefitPlan'],
        operation: ['getMany', 'get'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'string',
        default: '',
        placeholder: 'name,description',
        description: 'Comma-separated list of fields to return',
      },
      {
        displayName: 'Filter Expression',
        name: 'filter',
        type: 'string',
        default: '',
        placeholder: "(name startsWith 'Q1')",
        description: 'Clarity filter expression',
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
];
