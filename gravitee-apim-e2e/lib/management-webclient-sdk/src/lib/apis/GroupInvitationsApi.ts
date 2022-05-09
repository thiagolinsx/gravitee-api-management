/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io - Management API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InvitationEntity,
    InvitationEntityFromJSON,
    InvitationEntityToJSON,
    NewInvitationEntity,
    NewInvitationEntityFromJSON,
    NewInvitationEntityToJSON,
    UpdateInvitationEntity,
    UpdateInvitationEntityFromJSON,
    UpdateInvitationEntityToJSON,
} from '../models';

export interface CreateGroupInvitationRequest {
    group: string;
    envId: string;
    orgId: string;
    newInvitationEntity: NewInvitationEntity;
}

export interface DeleteGroupInvitationRequest {
    invitation: string;
    group: string;
    envId: string;
    orgId: string;
}

export interface GetGroupInvitationsRequest {
    group: string;
    envId: string;
    orgId: string;
}

export interface UpdateGroupInvitationRequest {
    invitation: string;
    group: string;
    envId: string;
    orgId: string;
    updateInvitationEntity: UpdateInvitationEntity;
}

/**
 * 
 */
export class GroupInvitationsApi extends runtime.BaseAPI {

    /**
     * User must have the GROUP_INVITATION[CREATE] permission to use this service
     * Create an invitation to join a group
     */
    async createGroupInvitationRaw(requestParameters: CreateGroupInvitationRequest): Promise<runtime.ApiResponse<InvitationEntity>> {
        if (requestParameters.group === null || requestParameters.group === undefined) {
            throw new runtime.RequiredError('group','Required parameter requestParameters.group was null or undefined when calling createGroupInvitation.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling createGroupInvitation.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling createGroupInvitation.');
        }

        if (requestParameters.newInvitationEntity === null || requestParameters.newInvitationEntity === undefined) {
            throw new runtime.RequiredError('newInvitationEntity','Required parameter requestParameters.newInvitationEntity was null or undefined when calling createGroupInvitation.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/configuration/groups/{group}/invitations`.replace(`{${"group"}}`, encodeURIComponent(String(requestParameters.group))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NewInvitationEntityToJSON(requestParameters.newInvitationEntity),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InvitationEntityFromJSON(jsonValue));
    }

    /**
     * User must have the GROUP_INVITATION[CREATE] permission to use this service
     * Create an invitation to join a group
     */
    async createGroupInvitation(requestParameters: CreateGroupInvitationRequest): Promise<InvitationEntity> {
        const response = await this.createGroupInvitationRaw(requestParameters);
        return await response.value();
    }

    /**
     * User must have the GROUP_INVITATION[DELETE] permission to use this service
     * Delete an invitation to join a group
     */
    async deleteGroupInvitationRaw(requestParameters: DeleteGroupInvitationRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.invitation === null || requestParameters.invitation === undefined) {
            throw new runtime.RequiredError('invitation','Required parameter requestParameters.invitation was null or undefined when calling deleteGroupInvitation.');
        }

        if (requestParameters.group === null || requestParameters.group === undefined) {
            throw new runtime.RequiredError('group','Required parameter requestParameters.group was null or undefined when calling deleteGroupInvitation.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling deleteGroupInvitation.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling deleteGroupInvitation.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/configuration/groups/{group}/invitations/{invitation}`.replace(`{${"invitation"}}`, encodeURIComponent(String(requestParameters.invitation))).replace(`{${"group"}}`, encodeURIComponent(String(requestParameters.group))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * User must have the GROUP_INVITATION[DELETE] permission to use this service
     * Delete an invitation to join a group
     */
    async deleteGroupInvitation(requestParameters: DeleteGroupInvitationRequest): Promise<void> {
        await this.deleteGroupInvitationRaw(requestParameters);
    }

    /**
     * User must have the GROUP_INVITATION[READ] permission to use this service
     * List existing invitations of a group
     */
    async getGroupInvitationsRaw(requestParameters: GetGroupInvitationsRequest): Promise<runtime.ApiResponse<Array<InvitationEntity>>> {
        if (requestParameters.group === null || requestParameters.group === undefined) {
            throw new runtime.RequiredError('group','Required parameter requestParameters.group was null or undefined when calling getGroupInvitations.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling getGroupInvitations.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getGroupInvitations.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/configuration/groups/{group}/invitations`.replace(`{${"group"}}`, encodeURIComponent(String(requestParameters.group))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(InvitationEntityFromJSON));
    }

    /**
     * User must have the GROUP_INVITATION[READ] permission to use this service
     * List existing invitations of a group
     */
    async getGroupInvitations(requestParameters: GetGroupInvitationsRequest): Promise<Array<InvitationEntity>> {
        const response = await this.getGroupInvitationsRaw(requestParameters);
        return await response.value();
    }

    /**
     * User must have the GROUP_INVITATION[UPDATE] permission to use this service
     * Update an invitation to join a group
     */
    async updateGroupInvitationRaw(requestParameters: UpdateGroupInvitationRequest): Promise<runtime.ApiResponse<InvitationEntity>> {
        if (requestParameters.invitation === null || requestParameters.invitation === undefined) {
            throw new runtime.RequiredError('invitation','Required parameter requestParameters.invitation was null or undefined when calling updateGroupInvitation.');
        }

        if (requestParameters.group === null || requestParameters.group === undefined) {
            throw new runtime.RequiredError('group','Required parameter requestParameters.group was null or undefined when calling updateGroupInvitation.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling updateGroupInvitation.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling updateGroupInvitation.');
        }

        if (requestParameters.updateInvitationEntity === null || requestParameters.updateInvitationEntity === undefined) {
            throw new runtime.RequiredError('updateInvitationEntity','Required parameter requestParameters.updateInvitationEntity was null or undefined when calling updateGroupInvitation.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/configuration/groups/{group}/invitations/{invitation}`.replace(`{${"invitation"}}`, encodeURIComponent(String(requestParameters.invitation))).replace(`{${"group"}}`, encodeURIComponent(String(requestParameters.group))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateInvitationEntityToJSON(requestParameters.updateInvitationEntity),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InvitationEntityFromJSON(jsonValue));
    }

    /**
     * User must have the GROUP_INVITATION[UPDATE] permission to use this service
     * Update an invitation to join a group
     */
    async updateGroupInvitation(requestParameters: UpdateGroupInvitationRequest): Promise<InvitationEntity> {
        const response = await this.updateGroupInvitationRaw(requestParameters);
        return await response.value();
    }

}
