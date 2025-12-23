/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const userProfileOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['userProfile'],
      },
    },
    options: [
      {
        name: 'Get',
        value: 'get',
        description: 'Get the current logged-in user profile',
        action: 'Get user profile',
      },
    ],
    default: 'get',
  },
];

export const userProfileFields: INodeProperties[] = [
  // No additional fields needed for userProfile:get
  // The operation returns the profile of the authenticated user
];
