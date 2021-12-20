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

/// <reference types="Cypress" />
import { ADMIN_USER, API_PUBLISHER_USER, LOW_PERMISSION_USER } from 'fixtures/fakers/users/users';
import { ApiFakers } from 'fixtures/fakers/apis';
import { PlanFakers } from 'fixtures/fakers/plans';
import { createApi, createPlan, deleteApi } from 'commands/management/api-management-commands';
import { Api } from 'model/apis';
import { SecurityType } from '@model/plan';

context('API tests', () => {
  describe('Create APIs', function () {
    afterEach(function () {
      //deleteApi(ADMIN_USER, this.apiId);
    });
    it('should create an API as admin user', function () {
      const fakeApi: Api = ApiFakers.api();
      createApi(ADMIN_USER, fakeApi).should((response) => {
        cy.wrap(response.body.id).as('apiId');
        cy.wrap(response.body.name).as('name');
        cy.wrap(response.body.context_path).as('context_path');
        expect(response.body.state).equal('STOPPED');
        expect(response.body.visibility).equal('PRIVATE');
        expect(response.body.lifecycle_state).equal('CREATED');
        
      });
    });

    it('should create a keyless plan as admin user', function () {
      const fakePlan = PlanFakers.plan({security: SecurityType.KEY_LESS});
      createPlan(ADMIN_USER, this.apiId, this.fakePlan).should(function (response) {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.all.keys('name', 'id', 'description', 'validation', 'security', 'type', 'status', 'api', 'order', 'created_at', 'updated_at', 'paths', 'flows', 'comment_required');
          expect(response.body.security).to.equal('KEY_LESS');
          expect(response.body.status).to.equal('STAGING');
          cy.wrap(response.body.id).as('planId');
      })
  });
});

    it('should fail to create an API if user lacks required permssions', function () {
      const fakeApi: Api = ApiFakers.api();
      createApi(LOW_PERMISSION_USER, fakeApi).should((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal('You do not have sufficient rights to access this resource');
      });
    });
  });

  // describe('Delete an API', function () {
  //   beforeEach(function () {
  //     const fakeApi: Api = ApiFakers.api();
  //     createApi(ADMIN_USER, fakeApi).should((response) => {
  //       expect(response.status).to.equal(201);
  //       cy.wrap(response.body.id).as('apiId');
  //     });
  //   });

  //   afterEach(function () {
  //     deleteApi(ADMIN_USER, this.apiId);
  //   });

  //   it('should delete an API as admin user', function () {
  //     deleteApi(ADMIN_USER, this.apiId).its('status').should('equal', 204);
  //   });

  //   it('should fail to delete an API as low permission user', function () {
  //     deleteApi(LOW_PERMISSION_USER, this.apiId).should((response) => {
  //       expect(response.status).to.be.equal(403);
  //       expect(response.body.message).to.be.equal('You do not have sufficient rights to access this resource');
  //     });
  //   });
  // });
// });
