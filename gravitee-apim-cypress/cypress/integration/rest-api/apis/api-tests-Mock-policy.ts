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
import { ADMIN_USER, API_PUBLISHER_USER, APPLICATION_USER, LOW_PERMISSION_USER } from 'fixtures/fakers/users/users';
import { ApiFakers } from 'fixtures/fakers/apis';
import { Api, ApiErrorCodes, ApiLifecycleState, ApiState, PortalApi } from 'model/apis';
import { CollectionResponse, PortalError } from 'model/technical';
import { PortalApiAssertions, ApiAssertions } from 'assertions/api.assertion';
import { ErrorAssertions } from 'assertions/error.assertion';
import { gio } from 'commands/gravitee.commands';
import { PlanFakers } from 'fixtures/fakers/plans';
import { SecurityType } from '@model/plan';
import { createMockpolicy1, createMockpolicy2, createPlan, deleteApi, publishPlan } from 'commands/management/api-management-commands';
import { fakePolicy } from 'fixtures/fakers/policy';

context('API - Publishing', () => {
  describe('Published', () => {
    let createdApi: Api;
    // Create new API withouth STARTING, PUBLISHING, PLAN and DEPLOYING
    describe('Prepare', () => {
      it('Should create an API', () => {
        const fakeApi: Api = ApiFakers.api();
        gio
          .management(ADMIN_USER)
          .apis()
          .create(fakeApi)
          .created()
          .should((response) => {
            ApiAssertions.assertThat(response).hasBeenCreated(fakeApi);
          })
          .then((response) => {
            createdApi = response.body;
            cy.log('Created api id:', createdApi.id);
          });
      });      

       // Publishes the API as Admin user
       it('Publish the API', () => {
        const apiToPublish = {
          ...createdApi,
          lifecycle_state: ApiLifecycleState.PUBLISHED,
        };
        
        //delete apiToPublish.lifecycle_state;
        
        delete apiToPublish.created_at;
        delete apiToPublish.updated_at;
        delete apiToPublish.owner;
        delete apiToPublish.context_path;

        gio
          .management(ADMIN_USER)
          .apis()
          .update(createdApi.id, apiToPublish)
          .ok()
          .should((response) => {
            ApiAssertions.assertThat(response).hasBeenPublished(apiToPublish);
          })
          .then((response) => {
            cy.log(createdApi.id)
            createdApi = response.body;
          });
      });
        //Starting the API as Admin user
      // it('Start the API', () => {
      //   const apiToStart = {
      //     ...createdApi,
      //     state: ApiState.STOPPED,
      //   };
      //   delete apiToStart.id;
      //   delete apiToStart.lifecycle_state;
      //   delete apiToStart.created_at;
      //   delete apiToStart.updated_at;
      //   delete apiToStart.owner;
      //   delete apiToStart.context_path;
        

      //   gio
      //     .management(ADMIN_USER)
      //     .apis()
      //     .start(createdApi.id)
      //     //.start(createdApi.id)
      //     .noContent()
      //     // .should((response) => {
      //     //   ApiAssertions.assertThat(response).hasBeenStarted(apiToStart);
      //     // })
      //     .then((response) => {
      //       createdApi = response.body;
      //       // expect(response.status).to.equal(204);
      //     });

          
      // });
      it('should create a keyless plan as admin user', function () {
        const fakePlan = PlanFakers.plan({security: SecurityType.KEY_LESS});
        createPlan(ADMIN_USER, createdApi.id, fakePlan).should(function (response) {
            expect(response.status).to.equal(201);
            //expect(response.body).to.have.all.keys('name', 'id', 'description', 'validation', 'security', 'type', 'status', 'api', 'order', 'created_at', 'updated_at', 'paths', 'flows', 'comment_required');
           //expect(response.body.security).to.equal('KEY_LESS');
            //expect(response.body.status).to.equal('STAGING');
            cy.wrap(response.body.id).as('planId');
        })
    });

    it('should publish a plan as admin user', function () {
      publishPlan(ADMIN_USER, createdApi.id, this.planId).should(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.status).to.equal('PUBLISHED');
          cy.wrap(response.body.id).as('planId');
      })
    });

    it('should create Mock policy', function () {
        //const fakedPolicy = fakePolicy.plan({id: createdApi.id});
        createMockpolicy2(ADMIN_USER, createdApi).should(function (response) {
            expect(response.status).to.equal(200);
            //expect(response.body.status).to.equal('PUBLISHED');
            //cy.wrap(response.body.id).as('planId');
        })
    });
    
    it('Publish Mock policy and available to Gratewey', function () {
      //const fakedPolicy = fakePolicy.plan({id: createdApi.id});
      createMockpolicy2(ADMIN_USER, createdApi).should(function (response) {
          expect(response.status).to.equal(200);
          //expect(response.body.status).to.equal('PUBLISHED');
          //cy.wrap(response.body.id).as('planId');
      })
  });



    // it('should delete an API as admin user', function () {
    //   deleteApi(ADMIN_USER, createdApi.id).its('status').should('equal', 204);
    // });



    });  
  });
});
