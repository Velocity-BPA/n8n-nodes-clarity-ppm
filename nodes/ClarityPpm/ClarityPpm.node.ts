/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import {
  clarityPpmApiRequest,
  clarityPpmApiRequestAllItems,
  buildFilterExpression,
} from './GenericFunctions';

import { projectOperations, projectFields } from './descriptions/ProjectDescription';
import { taskOperations, taskFields } from './descriptions/TaskDescription';
import { timesheetOperations, timesheetFields } from './descriptions/TimesheetDescription';
import { resourceOperations, resourceFields } from './descriptions/ResourceDescription';
import { roadmapOperations, roadmapFields } from './descriptions/RoadmapDescription';
import { teamOperations, teamFields } from './descriptions/TeamDescription';
import { costPlanOperations, costPlanFields } from './descriptions/CostPlanDescription';
import { benefitPlanOperations, benefitPlanFields } from './descriptions/BenefitPlanDescription';
import { lookupOperations, lookupFields } from './descriptions/LookupDescription';
import { integrationOperations, integrationFields } from './descriptions/IntegrationDescription';
import { userProfileOperations, userProfileFields } from './descriptions/UserProfileDescription';

export class ClarityPpm implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Clarity PPM',
    name: 'clarityPpm',
    icon: 'file:clarity-ppm.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description:
      'Interact with Broadcom Clarity PPM for project portfolio management, timesheets, resources, and financial planning',
    defaults: {
      name: 'Clarity PPM',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'clarityPpmApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Benefit Plan', value: 'benefitPlan' },
          { name: 'Cost Plan', value: 'costPlan' },
          { name: 'Integration', value: 'integration' },
          { name: 'Lookup', value: 'lookup' },
          { name: 'Project', value: 'project' },
          { name: 'Resource', value: 'resource' },
          { name: 'Roadmap', value: 'roadmap' },
          { name: 'Task', value: 'task' },
          { name: 'Team', value: 'team' },
          { name: 'Timesheet', value: 'timesheet' },
          { name: 'User Profile', value: 'userProfile' },
        ],
        default: 'project',
      },
      // Operations and fields for each resource
      ...projectOperations,
      ...projectFields,
      ...taskOperations,
      ...taskFields,
      ...timesheetOperations,
      ...timesheetFields,
      ...resourceOperations,
      ...resourceFields,
      ...roadmapOperations,
      ...roadmapFields,
      ...teamOperations,
      ...teamFields,
      ...costPlanOperations,
      ...costPlanFields,
      ...benefitPlanOperations,
      ...benefitPlanFields,
      ...lookupOperations,
      ...lookupFields,
      ...integrationOperations,
      ...integrationFields,
      ...userProfileOperations,
      ...userProfileFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData: IDataObject | IDataObject[] = {};

        // ============================================
        //              PROJECT
        // ============================================
        if (resource === 'project') {
          if (operation === 'create') {
            const code = this.getNodeParameter('code', i) as string;
            const name = this.getNodeParameter('name', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { code, name, ...additionalFields };
            responseData = await clarityPpmApiRequest.call(this, 'POST', '/projects', body);
          } else if (operation === 'get') {
            const projectId = this.getNodeParameter('projectId', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;

            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              `/projects/${projectId}`,
              {},
              query,
            );
          } else if (operation === 'getMany') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as IDataObject;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            // Build filter
            if (filters.filter) {
              query.filter = filters.filter;
            } else {
              const filterObj: IDataObject = {};
              if (filters.isActive !== undefined) filterObj.isActive = filters.isActive;
              if (filters.manager) filterObj.manager = filters.manager;
              if (filters.status) filterObj.status = filters.status;
              const filterStr = buildFilterExpression(filterObj);
              if (filterStr) query.filter = filterStr;
            }

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                '/projects',
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(
                this,
                'GET',
                '/projects',
                {},
                query,
              );
              responseData = (response._results as IDataObject[]) || [response];
            }
          } else if (operation === 'update') {
            const projectId = this.getNodeParameter('projectId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            responseData = await clarityPpmApiRequest.call(
              this,
              'PATCH',
              `/projects/${projectId}`,
              updateFields,
            );
          } else if (operation === 'delete') {
            const projectId = this.getNodeParameter('projectId', i) as string;
            responseData = await clarityPpmApiRequest.call(
              this,
              'DELETE',
              `/projects/${projectId}`,
            );
          }
        }

        // ============================================
        //              TASK
        // ============================================
        else if (resource === 'task') {
          const projectId = this.getNodeParameter('projectId', i) as string;

          if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { name, ...additionalFields };
            responseData = await clarityPpmApiRequest.call(
              this,
              'POST',
              `/projects/${projectId}/tasks`,
              body,
            );
          } else if (operation === 'get') {
            const taskId = this.getNodeParameter('taskId', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.fields) query.fields = options.fields;
            if (options.links) query.links = true;

            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              `/projects/${projectId}/tasks/${taskId}`,
              {},
              query,
            );
          } else if (operation === 'getMany') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as IDataObject;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (filters.filter) {
              query.filter = filters.filter;
            } else {
              const filterObj: IDataObject = {};
              if (filters.milestone !== undefined) filterObj.milestone = filters.milestone;
              if (filters.status) filterObj.status = filters.status;
              const filterStr = buildFilterExpression(filterObj);
              if (filterStr) query.filter = filterStr;
            }

            if (options.fields) query.fields = options.fields;
            if (options.links) query.links = true;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                `/projects/${projectId}/tasks`,
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(
                this,
                'GET',
                `/projects/${projectId}/tasks`,
                {},
                query,
              );
              responseData = (response._results as IDataObject[]) || [response];
            }
          } else if (operation === 'update') {
            const taskId = this.getNodeParameter('taskId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            responseData = await clarityPpmApiRequest.call(
              this,
              'PATCH',
              `/projects/${projectId}/tasks/${taskId}`,
              updateFields,
            );
          } else if (operation === 'delete') {
            const taskId = this.getNodeParameter('taskId', i) as string;
            responseData = await clarityPpmApiRequest.call(
              this,
              'DELETE',
              `/projects/${projectId}/tasks/${taskId}`,
            );
          }
        }

        // ============================================
        //              TIMESHEET
        // ============================================
        else if (resource === 'timesheet') {
          if (operation === 'create') {
            const resourceId = this.getNodeParameter('resourceId', i) as number;
            const periodStart = this.getNodeParameter('periodStart', i) as string;
            const periodFinish = this.getNodeParameter('periodFinish', i) as string;

            const body: IDataObject = { resourceId, periodStart, periodFinish };
            responseData = await clarityPpmApiRequest.call(this, 'POST', '/timesheets', body);
          } else if (operation === 'get') {
            const timesheetId = this.getNodeParameter('timesheetId', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;

            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              `/timesheets/${timesheetId}`,
              {},
              query,
            );
          } else if (operation === 'getMany') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as IDataObject;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (filters.filter) {
              query.filter = filters.filter;
            } else {
              const filterObj: IDataObject = {};
              if (filters.resourceId) filterObj.resourceId = filters.resourceId;
              if (filters.status !== undefined) filterObj.status = filters.status;
              const filterStr = buildFilterExpression(filterObj);
              if (filterStr) query.filter = filterStr;
            }

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                '/timesheets',
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(
                this,
                'GET',
                '/timesheets',
                {},
                query,
              );
              responseData = (response._results as IDataObject[]) || [response];
            }
          } else if (operation === 'update') {
            const timesheetId = this.getNodeParameter('timesheetId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            responseData = await clarityPpmApiRequest.call(
              this,
              'PUT',
              `/timesheets/${timesheetId}`,
              updateFields,
            );
          } else if (operation === 'delete') {
            const timesheetId = this.getNodeParameter('timesheetId', i) as string;
            responseData = await clarityPpmApiRequest.call(
              this,
              'DELETE',
              `/timesheets/${timesheetId}`,
            );
          } else if (operation === 'submit') {
            const timesheetId = this.getNodeParameter('timesheetId', i) as string;
            responseData = await clarityPpmApiRequest.call(
              this,
              'PUT',
              `/timesheets/${timesheetId}`,
              { status: 1 },
            );
          } else if (operation === 'approve') {
            const timesheetId = this.getNodeParameter('timesheetId', i) as string;
            responseData = await clarityPpmApiRequest.call(
              this,
              'PUT',
              `/timesheets/${timesheetId}`,
              { status: 3 },
            );
          }
        }

        // ============================================
        //              RESOURCE
        // ============================================
        else if (resource === 'resource') {
          if (operation === 'get') {
            const resourceId = this.getNodeParameter('resourceId', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.fields) query.fields = options.fields;
            if (options.links) query.links = true;

            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              `/resources/${resourceId}`,
              {},
              query,
            );
          } else if (operation === 'getMany') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as IDataObject;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (filters.filter) {
              query.filter = filters.filter;
            } else {
              const filterObj: IDataObject = {};
              if (filters.isActive !== undefined) filterObj.isActive = filters.isActive;
              if (filters.firstName) filterObj.firstName = filters.firstName;
              if (filters.lastName) filterObj.lastName = filters.lastName;
              if (filters.email) filterObj.email = filters.email;
              if (filters.resourceType) filterObj.resourceType = filters.resourceType;
              const filterStr = buildFilterExpression(filterObj);
              if (filterStr) query.filter = filterStr;
            }

            if (options.fields) query.fields = options.fields;
            if (options.links) query.links = true;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                '/resources',
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(
                this,
                'GET',
                '/resources',
                {},
                query,
              );
              responseData = (response._results as IDataObject[]) || [response];
            }
          }
        }

        // ============================================
        //              ROADMAP
        // ============================================
        else if (resource === 'roadmap') {
          if (operation === 'create') {
            const code = this.getNodeParameter('code', i) as string;
            const name = this.getNodeParameter('name', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { code, name, ...additionalFields };
            responseData = await clarityPpmApiRequest.call(this, 'POST', '/roadmaps', body);
          } else if (operation === 'get') {
            const roadmapId = this.getNodeParameter('roadmapId', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;

            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              `/roadmaps/${roadmapId}`,
              {},
              query,
            );
          } else if (operation === 'getMany') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as IDataObject;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (filters.filter) {
              query.filter = filters.filter;
            } else {
              const filterObj: IDataObject = {};
              if (filters.status) filterObj.status = filters.status;
              if (filters.type) filterObj.type = filters.type;
              if (filters.author) filterObj.author = filters.author;
              const filterStr = buildFilterExpression(filterObj);
              if (filterStr) query.filter = filterStr;
            }

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                '/roadmaps',
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(
                this,
                'GET',
                '/roadmaps',
                {},
                query,
              );
              responseData = (response._results as IDataObject[]) || [response];
            }
          } else if (operation === 'update') {
            const roadmapId = this.getNodeParameter('roadmapId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            responseData = await clarityPpmApiRequest.call(
              this,
              'PATCH',
              `/roadmaps/${roadmapId}`,
              updateFields,
            );
          }
        }

        // ============================================
        //              TEAM
        // ============================================
        else if (resource === 'team') {
          if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { name, ...additionalFields };
            responseData = await clarityPpmApiRequest.call(this, 'POST', '/teams', body);
          } else if (operation === 'get') {
            const teamId = this.getNodeParameter('teamId', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;

            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              `/teams/${teamId}`,
              {},
              query,
            );
          } else if (operation === 'getMany') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as IDataObject;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (filters.filter) {
              query.filter = filters.filter;
            } else {
              const filterObj: IDataObject = {};
              if (filters.isActive !== undefined) filterObj.isActive = filters.isActive;
              if (filters.name) filterObj.name = filters.name;
              const filterStr = buildFilterExpression(filterObj);
              if (filterStr) query.filter = filterStr;
            }

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                '/teams',
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(this, 'GET', '/teams', {}, query);
              responseData = (response._results as IDataObject[]) || [response];
            }
          } else if (operation === 'update') {
            const teamId = this.getNodeParameter('teamId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            responseData = await clarityPpmApiRequest.call(
              this,
              'PATCH',
              `/teams/${teamId}`,
              updateFields,
            );
          } else if (operation === 'delete') {
            const teamId = this.getNodeParameter('teamId', i) as string;
            responseData = await clarityPpmApiRequest.call(this, 'DELETE', `/teams/${teamId}`);
          }
        }

        // ============================================
        //              COST PLAN
        // ============================================
        else if (resource === 'costPlan') {
          if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const investmentId = this.getNodeParameter('investmentId', i) as number;
            const planType = this.getNodeParameter('planType', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { name, investmentId, planType, ...additionalFields };
            responseData = await clarityPpmApiRequest.call(this, 'POST', '/costPlans', body);
          } else if (operation === 'get') {
            const costPlanId = this.getNodeParameter('costPlanId', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;

            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              `/costPlans/${costPlanId}`,
              {},
              query,
            );
          } else if (operation === 'getMany') {
            const investmentIdFilter = this.getNodeParameter('investmentIdFilter', i) as number;
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as IDataObject;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            // Build filter with required investmentId
            let filterParts: string[] = [`(investmentId = ${investmentIdFilter})`];

            if (filters.planType) {
              filterParts.push(`(planType = '${filters.planType}')`);
            }
            if (filters.isPlanOfRecord !== undefined) {
              filterParts.push(`(isPlanOfRecord = ${filters.isPlanOfRecord})`);
            }
            if (filters.filter) {
              filterParts.push(filters.filter as string);
            }

            query.filter = filterParts.join(' and ');

            if (options.fields) query.fields = options.fields;
            if (options.expand) query.expand = `(${options.expand})`;
            if (options.links) query.links = true;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                '/costPlans',
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(
                this,
                'GET',
                '/costPlans',
                {},
                query,
              );
              responseData = (response._results as IDataObject[]) || [response];
            }
          } else if (operation === 'update') {
            const costPlanId = this.getNodeParameter('costPlanId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            responseData = await clarityPpmApiRequest.call(
              this,
              'PATCH',
              `/costPlans/${costPlanId}`,
              updateFields,
            );
          } else if (operation === 'delete') {
            const costPlanId = this.getNodeParameter('costPlanId', i) as string;
            responseData = await clarityPpmApiRequest.call(
              this,
              'DELETE',
              `/costPlans/${costPlanId}`,
            );
          }
        }

        // ============================================
        //              BENEFIT PLAN
        // ============================================
        else if (resource === 'benefitPlan') {
          if (operation === 'get') {
            const benefitPlanId = this.getNodeParameter('benefitPlanId', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.fields) query.fields = options.fields;
            if (options.links) query.links = true;

            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              `/benefitPlans/${benefitPlanId}`,
              {},
              query,
            );
          } else if (operation === 'getMany') {
            const investmentId = this.getNodeParameter('investmentId', i) as number;
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            query.filter = `(investmentId = ${investmentId})`;

            if (options.filter) {
              query.filter = `${query.filter} and ${options.filter}`;
            }
            if (options.fields) query.fields = options.fields;
            if (options.links) query.links = true;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                '/benefitPlans',
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(
                this,
                'GET',
                '/benefitPlans',
                {},
                query,
              );
              responseData = (response._results as IDataObject[]) || [response];
            }
          }
        }

        // ============================================
        //              LOOKUP
        // ============================================
        else if (resource === 'lookup') {
          if (operation === 'getValues') {
            const lookupCode = this.getNodeParameter('lookupCode', i) as string;
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.isActive !== undefined) {
              query.filter = `(isActive = ${options.isActive})`;
            }
            if (options.filter) {
              query.filter = query.filter
                ? `${query.filter} and ${options.filter}`
                : options.filter;
            }
            if (options.fields) query.fields = options.fields;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                `/lookups/${lookupCode}/lookupValues`,
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(
                this,
                'GET',
                `/lookups/${lookupCode}/lookupValues`,
                {},
                query,
              );
              responseData = (response._results as IDataObject[]) || [response];
            }
          }
        }

        // ============================================
        //              INTEGRATION
        // ============================================
        else if (resource === 'integration') {
          if (operation === 'create') {
            const integrationData = this.getNodeParameter('integrationData', i) as string;
            const body = JSON.parse(integrationData) as IDataObject;
            responseData = await clarityPpmApiRequest.call(this, 'POST', '/integration', body);
          } else if (operation === 'get') {
            const integrationId = this.getNodeParameter('integrationId', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.fields) query.fields = options.fields;

            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              `/integration/${integrationId}`,
              {},
              query,
            );
          } else if (operation === 'getMany') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const options = this.getNodeParameter('options', i) as IDataObject;
            const query: IDataObject = {};

            if (options.filter) query.filter = options.filter;
            if (options.fields) query.fields = options.fields;
            if (options.sort) query.sort = options.sort;

            if (returnAll) {
              responseData = await clarityPpmApiRequestAllItems.call(
                this,
                'GET',
                '/integration',
                {},
                query,
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              query.limit = limit;
              const response = await clarityPpmApiRequest.call(
                this,
                'GET',
                '/integration',
                {},
                query,
              );
              responseData = (response._results as IDataObject[]) || [response];
            }
          } else if (operation === 'update') {
            const integrationId = this.getNodeParameter('integrationId', i) as string;
            const updateData = this.getNodeParameter('updateData', i) as string;
            const body = JSON.parse(updateData) as IDataObject;

            responseData = await clarityPpmApiRequest.call(
              this,
              'PATCH',
              `/integration/${integrationId}`,
              body,
            );
          }
        }

        // ============================================
        //              USER PROFILE
        // ============================================
        else if (resource === 'userProfile') {
          if (operation === 'get') {
            responseData = await clarityPpmApiRequest.call(
              this,
              'GET',
              '/virtual/userProfile',
            );
          }
        }

        // Return data
        if (responseData !== undefined) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData as IDataObject | IDataObject[]),
            { itemData: { item: i } },
          );
          returnData.push(...executionData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: (error as Error).message }),
            { itemData: { item: i } },
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
