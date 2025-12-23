/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

export interface IClarityCredentials {
  host: string;
  authType: 'basic' | 'token' | 'apiKey';
  username?: string;
  password?: string;
  apiKey?: string;
  clientId?: string;
}

export interface IClarityApiResponse {
  _internalId?: number;
  _self?: string;
  _links?: IDataObject;
  _totalCount?: number;
  _recordsReturned?: number;
  _pageSize?: number;
  _next?: string | null;
  _previous?: string | null;
  _results?: IDataObject[];
  _errors?: IClarityError[];
}

export interface IClarityError {
  resourceId?: string;
  errorMessage: string;
  errorCode?: string;
}

export interface IClarityProject {
  _internalId?: number;
  code: string;
  name: string;
  description?: string;
  scheduleStart?: string;
  scheduleFinish?: string;
  priority?: number;
  isActive?: boolean;
  manager?: number;
  status?: string;
  progress?: string;
  costType?: string;
  percentComplete?: number;
}

export interface IClarityTask {
  _internalId?: number;
  code?: string;
  name: string;
  startDate?: string;
  finishDate?: string;
  status?: string;
  percentComplete?: number;
  costType?: string;
  milestone?: boolean;
}

export interface IClarityTimesheet {
  _internalId?: number;
  resourceId: number;
  periodStart: string;
  periodFinish: string;
  status?: number;
}

export interface IClarityResource {
  _internalId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  resourceType?: string;
  isActive?: boolean;
  hireDate?: string;
  availability?: number;
}

export interface IClarityRoadmap {
  _internalId?: number;
  code: string;
  name: string;
  description?: string;
  type?: string;
  status?: string;
  startDate?: string;
  finishDate?: string;
  startPeriod?: number;
  duration?: number;
  author?: number;
}

export interface IClarityTeam {
  _internalId?: number;
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface IClarityCostPlan {
  _internalId?: number;
  name: string;
  investmentId: number;
  planType: 'FORECAST' | 'BUDGET';
  description?: string;
  isPlanOfRecord?: boolean;
}

export interface IClarityBenefitPlan {
  _internalId?: number;
  name: string;
  investmentId: number;
  description?: string;
}

export interface IClarityUserProfile {
  _internalId: number;
  firstName: string;
  lastName: string;
  language: string;
  userName: string;
  locale: string;
  email: string;
}

export interface IClarityLookupValue {
  _internalId?: number;
  id?: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}

export type ClarityResource =
  | 'project'
  | 'task'
  | 'timesheet'
  | 'resource'
  | 'roadmap'
  | 'team'
  | 'costPlan'
  | 'benefitPlan'
  | 'lookup'
  | 'integration'
  | 'link'
  | 'financialTransaction'
  | 'userProfile';

export type ClarityOperation =
  | 'create'
  | 'get'
  | 'getMany'
  | 'update'
  | 'delete'
  | 'submit'
  | 'approve'
  | 'getValues';
