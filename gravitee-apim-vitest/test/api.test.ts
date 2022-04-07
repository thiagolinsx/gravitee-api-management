import { expect, describe, it } from 'vitest'
import { BasicAuthentication } from '../model/users';
import { Api, Error, ApiLifecycleState } from '../model/apis';
import axios, { Axios, AxiosResponse } from 'axios';
import { NewPlanEntity, Plan, PlanSecurityType } from '../model/plan';
import { ApiFakers } from '../fakers/apis';
import { ADMIN_USER, LOW_PERMISSION_USER } from '../fakers/users/users';
import { PlanFakers } from '../fakers/plans';

// Edit an assertion and save to see HMR in action

const BASE_URL = "http://localhost:8083";
const GATEWAY = "http://localhost:8082";
const MANAGEMENT = "/management/organizations/DEFAULT/environments/DEFAULT";
let myAxios = axios.create({validateStatus: () => true})

describe('Create an API flow', () => {
    let api: Api;
    let plan: NewPlanEntity;

    describe('Create an API', function () {
        it('should create an API as admin user', async function () {
            const fakeApi: Api = ApiFakers.api();
            const response = await createApi(ADMIN_USER, fakeApi);
            expect(response.data.state).equal('STOPPED');
            expect(response.data.visibility).equal('PRIVATE');
            expect(response.data.lifecycle_state).equal('CREATED');
            api = response.data;
        });

        it('should fail to create an API if user lacks required permissions', function (done) {
            const fakeApi: Api = ApiFakers.api();
            createApi(LOW_PERMISSION_USER, fakeApi).then((response: AxiosResponse<Error>) => {
                expect(response.status).to.equal(403);
                expect(response.data.message).to.equal('You do not have sufficient rights to access this resource');
                done();
            });
        });
    });

    describe('Create a plan', () => {
        it('should create a keyless plan as admin user', function (done) {
            const fakePlan = PlanFakers.plan({ security: PlanSecurityType.KEY_LESS });
            createPlan(ADMIN_USER, api.id, fakePlan).then(function (response: AxiosResponse<NewPlanEntity>) {
                expect(response.status).to.equal(201);
                expect(response.data).to.have.all.keys(
                    'name',
                    'id',
                    'description',
                    'validation',
                    'security',
                    'type',
                    'status',
                    'api',
                    'order',
                    'created_at',
                    'updated_at',
                    'paths',
                    'flows',
                    'comment_required',
                );
                expect(response.data.security).to.equal('KEY_LESS');
                expect(response.data.status).to.equal('STAGING');
                plan = response.data;
                done();
            });
        });
    });

    describe('Publish plan', function () {
        it('should publish a plan as admin user', function (done) {
            publishPlan(ADMIN_USER, api.id, plan.id).then(function (response) {
                expect(response.status).to.equal(200);
                expect(response.data.status).to.equal('PUBLISHED');
                done();
            });
        });
    });

    describe('Publish an API', function () {
        it('should publish an API as admin user', function (done) {
            publishApi(ADMIN_USER, api).then(function (response) {
                expect(response.status).to.equal(200);
                expect(response.data.lifecycle_state).to.equal('PUBLISHED');
                expect(response.data.state).to.equal('STOPPED');
                expect(response.data.visibility).to.equal('PRIVATE');
                done();
            });
        });
    });

    describe('Start an API', function () {
        it('should start an API as admin user', function (done) {
            startApi(ADMIN_USER, api.id).then(function (response) {
                expect(response.status).to.equal(204);
                done();
            });
        });
    });

    describe('Test newly created API', function () {
        it('should get a positive response when calling the new API endpoint', function (done) {
            requestGateway(`${GATEWAY}${api.context_path}?teststring=${api.id}`)
                .then(response => {
                    expect(response.status).to.be.equal(200);
                    expect(response.data.query_aparams.teststring).to.be.equal(api.id);
                    done();
                })
        });
    });

    describe('Stop an API', function () {
        it('should delete an API as admin user', function (done) {
            stopApi(ADMIN_USER, api.id).then(response => {
                expect(response.status).to.be.equal(204);
                done();
            });
        });
    });

    describe('Delete a plan', function () {
        it('should delete a plan as admin user', function (done) {
            deletePlan(ADMIN_USER, api.id, plan.id).then(response => {
                expect(response.status).to.be.equal(204);
                done();
            });
        });
    });

    describe('Delete an API', function () {
        it('should fail to delete an API as low permission user', function (done) {
            deleteApi(LOW_PERMISSION_USER, api.id).then((response: AxiosResponse) => {
                expect(response.status).to.be.equal(403);
                expect(response.data.message).to.be.equal('You do not have sufficient rights to access this resource');
                done();
            });
        });

        it('should delete an API as admin user', function (done) {
            deleteApi(ADMIN_USER, api.id).then(response => {
                expect(response.status).to.be.equal(403);
                done();
            });
        });

        it('should fail to delete a non-existing API as admin user', function (done) {
            deleteApi(ADMIN_USER, api.id).then(response => {
                expect(response.status).to.be.equal(404);
                done();
            });
        });
    });
});

export function createApi(auth: BasicAuthentication, body: Api): Promise<AxiosResponse<Api>|AxiosResponse<Error>> {
    return myAxios.post(
        `${BASE_URL}${MANAGEMENT}/apis`,
        body,
        {
            auth: auth,
        }
    );
}

export function createPlan(auth: BasicAuthentication, apiId: string, body: Partial<NewPlanEntity>): Promise<AxiosResponse<NewPlanEntity>|AxiosResponse<Error>> {
    return myAxios.post(
        `${BASE_URL}${MANAGEMENT}/apis/${apiId}/plans`,
        body,
        {
            auth: auth
        }
    );
}

export function publishPlan(auth: BasicAuthentication, apiId: string, planId: string): Promise<AxiosResponse<Plan>> {
    return myAxios.post(
        `${BASE_URL}${MANAGEMENT}/apis/${apiId}/plans/${planId}/_publish`,
        null,
        {
            auth: auth
        }
    );
}

export function publishApi(auth: BasicAuthentication, createdApi: Api): Promise<AxiosResponse<Api>> {
    const apiToPublish = {
        ...createdApi,
        lifecycle_state: ApiLifecycleState.PUBLISHED,
    };
    delete apiToPublish.id;
    delete apiToPublish.state;
    delete apiToPublish.created_at;
    delete apiToPublish.updated_at;
    delete apiToPublish.owner;
    delete apiToPublish.contextPath;
    return myAxios.put(
        `${BASE_URL}${MANAGEMENT}/apis/${createdApi.id}`,
        apiToPublish,
        {
            auth: auth
        }
    );
}

export function startApi(auth: BasicAuthentication, apiId: string): Promise<AxiosResponse<Api>> {
    return myAxios.post(
        `${BASE_URL}${MANAGEMENT}/apis/${apiId}/apis/${apiId}?action=START`,
        "",
        {
            auth: auth
        }
    );
}

export function stopApi(auth: BasicAuthentication, apiId: string): Promise<AxiosResponse<Api>> {
    return myAxios.post(
        `${BASE_URL}${MANAGEMENT}/apis/${apiId}/apis/${apiId}?action=STOP`,
        "",
        {
            auth: auth
        }
    );
}

export function deleteApi(auth: BasicAuthentication, apiId: string): Promise<AxiosResponse> {
    return myAxios.delete(
        `${BASE_URL}${MANAGEMENT}/apis/${apiId}/apis/${apiId}`,
        {
            auth: auth
        }
    );
}

export function deletePlan(auth: BasicAuthentication, apiId: string, planId: string): Promise<AxiosResponse> {
    return myAxios.delete(
        `${BASE_URL}${MANAGEMENT}/apis/${apiId}/apis/${apiId}/plans/${planId}`,
        {
            auth: auth
        }
    );
}

export function requestGateway(request: string, respStatus= 0){

    return myAxios.get(request).then((response) => {
        if (respStatus !== 200) {
            return requestGateway(request);
        }else{
            return response;
        }
    });
}


