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
import { ADMIN_USER, API_PUBLISHER_USER } from '../../fixtures/fakers/users/users';
import { ApiFakers } from '../../fixtures/fakers/apis';
import { Api, ApiLifecycleState, ApiState, ApiVisibility, ApiWorkflowState } from '../../model/apis';
import { NewPlanEntity, StatusState } from '../../model/plan';
import { ApiAssertions } from '../../assertions/api.assertion';
import { gio } from '../../commands/gravitee.commands';
import { result } from '../../../node_modules/cypress/types/lodash/index';
import { request } from 'http';

function apiUnPublishAndStopAndClosePlan (apiId: string,api: Api) {
  
  gio
        .management(ADMIN_USER)
        .apis()
        .updateCreate(apiId, api)
        .ok()
        .should((publishResponse) => {
          expect(publishResponse.body.lifecycle_state).to.eq('UNPUBLISHED');
        }); 

        if (api.state!="STOPPED")
        {
          gio
            .management(ADMIN_USER)
            .apis()
            .stop(apiId)
            .noContent()
            .should((response) => {
              const result: Api = response.body;
              //expect(result.state).to.equal('STOPPED');
            });
        }
        // if (apiIdPlan!="")
        
            gio
              .management(ADMIN_USER)
              .apis()
              .getPlanId(apiId)
              .ok()
              .should((response) => {
                
                const result : Api = response.body;
                if (request.id!= undefined){
                const apiIdPlan:string = result[0].id;
                const planStatus:string = result[0].status;
                cy.log("apiIdPlan: "+apiIdPlan)
                if (apiIdPlan!=undefined && (planStatus!=StatusState.CLOSED)){
               
                  gio
                    .management(ADMIN_USER)
                    .apis()
                    .stopPlanX(apiId, apiIdPlan, api)
                    .ok()
                    .should((response) => {
                      const result: Api = response.body;
                      expect(result.status).to.equal('CLOSED');
                    });
                  }
                 }
                
              });
}
          
          



function getPlanId (apiId: string) {
  cy.request({
    method: 'GET',
    url: `http://localhost:8083/management/organizations/DEFAULT/environments/DEFAULT/apis/${apiId}/plans?status=staging,published,closed,deprecated`,
    auth: {username:'admin', password:'admin' },
  
    }).as('endpoint1Response')
    .then(response=>{
        cy.log(response.body.id)
       // USER_ID=response.body.id;
    })
}
describe('API List feature', () => {
  let readApi: Api;
  let PLAN_ID='';
  it('Should get the API and check its status', () => {
    gio
      .management(ADMIN_USER)
      .apis()
      .getApiById(readApi.id)
      .ok()
      .should((response) => {
        ApiAssertions.assertThat(response)
          .hasState(ApiState.STOPPED)
          .hasVisibility(ApiVisibility.PRIVATE)
          .hasLifecycleState(ApiLifecycleState.CREATED)
          .hasWorkflowState(ApiWorkflowState.IN_REVIEW);
      });
  });

  
//   it('Deleting an API', () => {
    
//     cy.request({
//       url: 'http://localhost:8083/management/organizations/DEFAULT/environments/DEFAULT/apis/_paged?page=1&portal=false',
//       auth: {username:'admin', password:'admin' },

//     }).then(res => {
//       //let id= res.body.data[0].id;
//       let filters = [
//         o => o.state.toString().includes('STOPPED'),
//         o => o.lifecycle_state.toString().includes('CREATED'),
//     ],
//      result = res.body.data.filter(o => filters.every(fn => fn(o)));
//      cy.log(result)
//      //gio.management(ADMIN_USER).apis().update(result[0].id,result[0].lifecycle_state('CREATED') )
//      //Deletes the API
//       gio.management(ADMIN_USER).apis().delete(result[0].id).noContent();

//   });
// });

it.only('Deleting an API', () => {
  let api: Api;
let apiIdPlan: string;
  cy.request({
    url: 'http://localhost:8083/management/organizations/DEFAULT/environments/DEFAULT/apis/_paged?page=1&portal=false',
    auth: {username:'admin', password:'admin' },

  }).then(res => {

    var count = Object.keys(res.body.data).length;
    //let id= res.body.data[0].id;
 for( let i=0;i <count;i++){
  let result = res.body;
  // foreach id in response data
  const apiToPublish = {
    ...api,
    lifecycle_state: res.body.data[i].lifecycle_state,
    id: res.body.data[i].id,
    name: res.body.data[i].name,
    state : res.body.data[i].state,
    visibility : res.body.data[i].visibility,
    description : res.body.data[i].description,
    version : res.body.data[i].version,
    message: res.body.data[i].version,
    proxy : {"virtual_hosts": res.body.data[i].virtual_hosts,"groups": [{"name":"default-group","endpoints":[{"backup":false,
    "name":"default","weight":1,"type":"http","target":"https://api.gravitee.io/echo"}],"load_balancing":{"type":"ROUND_ROBIN"},
    "http":{"connectTimeout":5000,"idleTimeout":60000,"keepAlive":true,"readTimeout":10000,"pipelining":false,"maxConcurrentConnections":100,
    "useCompression":true,"followRedirects":false}}]},
    paths :res.body.data[i].path,
  };

   cy.log("Api ID: "+result.data[i].id)
let apiId=result.data[i].id;
   //var apiIdPlan: planApi;
  // let apiIdPlan: planApi = JSON.parse(toString(getPlanId(result.data[i].id)));

/*   cy.request({
    method: 'GET',
    url: `http://localhost:8083/management/organizations/DEFAULT/environments/DEFAULT/apis/${apiId}/plans?status=staging,published,closed,deprecated`,
    auth: {username:'admin', password:'admin' },
  
    }).as('endpoint1Response')
    .then(response=>{
        cy.log(response.body.id)
        PLAN_ID=response.body.id;
    })
  apiIdPlan=endpoint1Response;
  
cy.log("PLAN_ID:"+ PLAN_ID) */

   apiUnPublishAndStopAndClosePlan(result.data[i].id, apiToPublish)
   
   
  // gio.management(ADMIN_USER).apis().update(result[0].id, result[0].lifecycle_state('CREATED') )
   //Deletes the API
    gio.management(ADMIN_USER).apis().delete(result.data[i].id).noContent();
 }
});
});

});

/* 
http://localhost:8083/management/organizations/DEFAULT/environments/DEFAULT/apis/f3cdabf9-351f-4a60-8dab-f9351fea60ee/plans?status=staging,published,closed,deprecated


http://localhost:8083/management/organizations/DEFAULT/environments/DEFAULT/apis/f3cdabf9-351f-4a60-8dab-f9351fea60ee/plans/b091f1b1-4b73-403d-91f1-b14b73703dd4/_close

{id: "b091f1b1-4b73-403d-91f1-b14b73703dd4", name: "test2", description: "Unlimited access plan",…}

api: "f3cdabf9-351f-4a60-8dab-f9351fea60ee"
characteristics: []
comment_required: false
created_at: 1639054839225
description: "Unlimited access plan"
flows: []
id: "b091f1b1-4b73-403d-91f1-b14b73703dd4"
name: "test2"
order: 0
paths: {/: []}
security: "KEY_LESS"
securityDefinition: "{}"
status: "PUBLISHED"
tags: []
type: "API"
updated_at: 1639055456645
validation: "AUTO" */