/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Api, ApiErrorCodes, ApiLifecycleState, PortalApi } from 'model/apis';
import { NewPlanEntity } from 'model/plan';
import { User, BasicAuthentication } from 'model/users';

export function createApi(auth: BasicAuthentication, body: Api, failOnStatusCode = false) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis`,
    body,
    auth,
    failOnStatusCode,
  });
}

export function publishApi(auth: BasicAuthentication, apiId: string, api: Api, failOnStatusCode = false) {
  // const apiToPublish = {
  //   ...createdApi,
  //   lifecycle_state: ApiLifecycleState.PUBLISHED,
  // };
  api.lifecycle_state = ApiLifecycleState.PUBLISHED;
  return cy.request({
    method: 'PUT',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${apiId}`,
    body: api,
    auth,
    failOnStatusCode,
  });
}

export function deleteApi(auth: BasicAuthentication, apiId: string, failOnStatusCode = false) {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${apiId}`,
    auth,
    failOnStatusCode,
  });
}

export function deployApi(auth: BasicAuthentication, apiId: string, failOnStatusCode = false) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${apiId}/deploy`,
    auth,
    failOnStatusCode,
  });
}

export function startApi(auth: BasicAuthentication, apiId: string, failOnStatusCode = false) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${apiId}?action=START`,
    auth,
    failOnStatusCode,
  });
}

export function stopApi(auth: BasicAuthentication, apiId: string, failOnStatusCode = false) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${apiId}?action=STOP`,
    auth,
    failOnStatusCode,
  });
}

export function createPlan(auth: BasicAuthentication, apiId: string, body: Partial<NewPlanEntity>, failOnStatusCode = false) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${apiId}/plans`,
    auth,
    body,
    failOnStatusCode,
  });
}

export function deletePlan(auth: BasicAuthentication, apiId: string, planId: string, failOnStatusCode = false) {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${apiId}/plans/${planId}`,
    auth,
    failOnStatusCode,
  });
}

export function publishPlan(auth: BasicAuthentication, apiId: string, planId: string, failOnStatusCode = false) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${apiId}/plans/${planId}/_publish`,
    auth,
    failOnStatusCode,
  });
}