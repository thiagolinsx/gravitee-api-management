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
import { Mock_policy } from '@model/policy';
import { Api, ApiLifecycleState } from 'model/apis';
import { NewPlanEntity } from 'model/plan';
import { BasicAuthentication } from 'model/users';

export function createApi(auth: BasicAuthentication, body: Api, failOnStatusCode = false) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis`,
    body,
    auth,
    failOnStatusCode,
  });
}

export function publishApi(auth: BasicAuthentication, createdApi: Api, failOnStatusCode = false) {
  const apiToPublish = {
    ...createdApi,
    lifecycle_state: ApiLifecycleState.PUBLISHED,
  };
  delete apiToPublish.id;
  delete apiToPublish.state;
  delete apiToPublish.created_at;
  delete apiToPublish.updated_at;
  delete apiToPublish.owner;
  delete apiToPublish.context_path;
  return cy.request({
    method: 'PUT',
    url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${createdApi.id}`,
    body: apiToPublish,
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

export function createMockpolicy1(auth: BasicAuthentication, apiId: string, body: Partial<Mock_policy>, failOnStatusCode = false) {
  return cy.request({
    method: 'PUT',
      url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${apiId}`,
      auth,
      //body:{data:'mockbody', status:200, message:"success"},
      body:"{\n  \"id\" : \"7bc81b2b-ff2e-4c19-881b-2bff2e2c1953\",\n  \"name\" : \"Practical Soft Shoes\",\n  \"version\" : \"2.1.2\",\n  \"description\" : \"The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive\",\n  \"groups\" : [ \"1858708e-9ef5-4d62-9870-8e9ef56d6255\" ],\n  \"visibility\" : \"PRIVATE\",\n  \"state\" : \"STOPPED\",\n  \"tags\" : [ ],\n  \"context_path\" : \"/Sausages-6beaa07f-9531-4ec7-86db-033157345ce6-1640005862\",\n  \"proxy\" : {\n    \"virtual_hosts\" : [ {\n      \"path\" : \"/Sausages-6beaa07f-9531-4ec7-86db-033157345ce6-1640005862\"\n    } ],\n    \"strip_context_path\" : false,\n    \"preserve_host\" : false,\n    \"groups\" : [ {\n      \"name\" : \"default-group\",\n      \"endpoints\" : [ {\n        \"backup\" : false,\n        \"name\" : \"default\",\n        \"weight\" : 1,\n        \"type\" : \"http\",\n        \"target\" : \"https://api.gravitee.io/echo\"\n      } ],\n      \"load_balancing\" : {\n        \"type\" : \"ROUND_ROBIN\"\n      },\n      \"http\" : {\n        \"connectTimeout\" : 5000,\n        \"idleTimeout\" : 60000,\n        \"keepAlive\" : true,\n        \"readTimeout\" : 10000,\n        \"pipelining\" : false,\n        \"maxConcurrentConnections\" : 100,\n        \"useCompression\" : true,\n        \"followRedirects\" : false\n      }\n    } ]\n  },\n  \"flow_mode\" : \"DEFAULT\",\n  \"paths\" : {\n    \"/\" : [ {\n      \"methods\" : [ \"CONNECT\", \"DELETE\", \"GET\", \"HEAD\", \"OPTIONS\", \"PATCH\", \"POST\", \"PUT\", \"TRACE\" ],\n      \"mock\" : {\"headers\":[],\"content\":\"Te molam raboti primer\",\"status\":\"200\"},\n      \"description\" : \"Description of the Mock Gravitee Policy\",\n      \"enabled\" : true\n    } ]\n  },\n  \"gravitee\" : \"1.0.0\",\n  \"created_at\" : 1640005863246,\n  \"updated_at\" : 1640011314429,\n  \"owner\" : {\n    \"id\" : \"ad800d00-ed2f-41c8-800d-00ed2fa1c852\",\n    \"displayName\" : \"admin\",\n    \"type\" : \"USER\"\n  },\n  \"properties\" : [ ],\n  \"services\" : { },\n  \"picture_url\" : \"http://localhost:8083/management/organizations/DEFAULT/environments/DEFAULT/apis/7bc81b2b-ff2e-4c19-881b-2bff2e2c1953/picture?hash=1640011314429\",\n  \"resources\" : [ ],\n  \"path_mappings\" : [ \"/\" ],\n  \"response_templates\" : { },\n  \"lifecycle_state\" : \"PUBLISHED\",\n  \"disable_membership_notifications\" : false,\n  \"background_url\" : \"http://localhost:8083/management/organizations/DEFAULT/environments/DEFAULT/apis/7bc81b2b-ff2e-4c19-881b-2bff2e2c1953/background?hash=1640011314429\"\n}",
      failOnStatusCode,      
  });
}

export function createMockpolicy2(auth: BasicAuthentication, createdApi: Api, failOnStatusCode = false) {
  cy.fixture('mock_payload').then((mockbody) => {
    cy.intercept('GET', 'mock_payload', mockbody).as('mockbody')
  })
    return cy.request({
      method: 'PUT',
      url: `${Cypress.config().baseUrl}${Cypress.env('managementApi')}/apis/${createdApi.id}`,
      auth,
      body: createdApi,
      failOnStatusCode,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(function(response){return response});
  };
