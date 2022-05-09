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
    NewTokenEntity,
    NewTokenEntityFromJSON,
    NewTokenEntityToJSON,
    TokenEntity,
    TokenEntityFromJSON,
    TokenEntityToJSON,
} from '../models';

export interface CreateTokenRequest {
    userId: string;
    envId: string;
    orgId: string;
    newTokenEntity: NewTokenEntity;
}

export interface CreateToken1Request {
    userId: string;
    orgId: string;
    newTokenEntity: NewTokenEntity;
}

export interface CreateTokensRequest {
    orgId: string;
    newTokenEntity: NewTokenEntity;
}

export interface CreateTokens1Request {
    envId: string;
    orgId: string;
    newTokenEntity: NewTokenEntity;
}

export interface GetTokensRequest {
    orgId: string;
}

export interface GetTokens1Request {
    envId: string;
    orgId: string;
}

export interface GetUserTokensRequest {
    userId: string;
    envId: string;
    orgId: string;
}

export interface GetUserTokens1Request {
    userId: string;
    orgId: string;
}

export interface RevokeAllTokensRequest {
    orgId: string;
}

export interface RevokeAllTokens1Request {
    envId: string;
    orgId: string;
}

export interface RevokeTokenRequest {
    token: string;
    orgId: string;
}

export interface RevokeToken1Request {
    token: string;
    envId: string;
    orgId: string;
}

export interface RevokeToken2Request {
    token: string;
    userId: string;
    envId: string;
    orgId: string;
}

export interface RevokeToken3Request {
    token: string;
    userId: string;
    orgId: string;
}

/**
 * 
 */
export class UserTokensApi extends runtime.BaseAPI {

    /**
     * Create a personal token
     */
    async createTokenRaw(requestParameters: CreateTokenRequest): Promise<runtime.ApiResponse<TokenEntity>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling createToken.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling createToken.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling createToken.');
        }

        if (requestParameters.newTokenEntity === null || requestParameters.newTokenEntity === undefined) {
            throw new runtime.RequiredError('newTokenEntity','Required parameter requestParameters.newTokenEntity was null or undefined when calling createToken.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/users/{userId}/tokens`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NewTokenEntityToJSON(requestParameters.newTokenEntity),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenEntityFromJSON(jsonValue));
    }

    /**
     * Create a personal token
     */
    async createToken(requestParameters: CreateTokenRequest): Promise<TokenEntity> {
        const response = await this.createTokenRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a personal token
     */
    async createToken1Raw(requestParameters: CreateToken1Request): Promise<runtime.ApiResponse<TokenEntity>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling createToken1.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling createToken1.');
        }

        if (requestParameters.newTokenEntity === null || requestParameters.newTokenEntity === undefined) {
            throw new runtime.RequiredError('newTokenEntity','Required parameter requestParameters.newTokenEntity was null or undefined when calling createToken1.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/users/{userId}/tokens`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NewTokenEntityToJSON(requestParameters.newTokenEntity),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenEntityFromJSON(jsonValue));
    }

    /**
     * Create a personal token
     */
    async createToken1(requestParameters: CreateToken1Request): Promise<TokenEntity> {
        const response = await this.createToken1Raw(requestParameters);
        return await response.value();
    }

    /**
     * Create a personal token
     */
    async createTokensRaw(requestParameters: CreateTokensRequest): Promise<runtime.ApiResponse<TokenEntity>> {
        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling createTokens.');
        }

        if (requestParameters.newTokenEntity === null || requestParameters.newTokenEntity === undefined) {
            throw new runtime.RequiredError('newTokenEntity','Required parameter requestParameters.newTokenEntity was null or undefined when calling createTokens.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/user/tokens`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NewTokenEntityToJSON(requestParameters.newTokenEntity),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenEntityFromJSON(jsonValue));
    }

    /**
     * Create a personal token
     */
    async createTokens(requestParameters: CreateTokensRequest): Promise<TokenEntity> {
        const response = await this.createTokensRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a personal token
     */
    async createTokens1Raw(requestParameters: CreateTokens1Request): Promise<runtime.ApiResponse<TokenEntity>> {
        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling createTokens1.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling createTokens1.');
        }

        if (requestParameters.newTokenEntity === null || requestParameters.newTokenEntity === undefined) {
            throw new runtime.RequiredError('newTokenEntity','Required parameter requestParameters.newTokenEntity was null or undefined when calling createTokens1.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/user/tokens`.replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NewTokenEntityToJSON(requestParameters.newTokenEntity),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenEntityFromJSON(jsonValue));
    }

    /**
     * Create a personal token
     */
    async createTokens1(requestParameters: CreateTokens1Request): Promise<TokenEntity> {
        const response = await this.createTokens1Raw(requestParameters);
        return await response.value();
    }

    /**
     * List user\'s personal tokens
     */
    async getTokensRaw(requestParameters: GetTokensRequest): Promise<runtime.ApiResponse<Array<TokenEntity>>> {
        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getTokens.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/user/tokens`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TokenEntityFromJSON));
    }

    /**
     * List user\'s personal tokens
     */
    async getTokens(requestParameters: GetTokensRequest): Promise<Array<TokenEntity>> {
        const response = await this.getTokensRaw(requestParameters);
        return await response.value();
    }

    /**
     * List user\'s personal tokens
     */
    async getTokens1Raw(requestParameters: GetTokens1Request): Promise<runtime.ApiResponse<Array<TokenEntity>>> {
        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling getTokens1.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getTokens1.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/user/tokens`.replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TokenEntityFromJSON));
    }

    /**
     * List user\'s personal tokens
     */
    async getTokens1(requestParameters: GetTokens1Request): Promise<Array<TokenEntity>> {
        const response = await this.getTokens1Raw(requestParameters);
        return await response.value();
    }

    /**
     * List user\'s personal tokens
     */
    async getUserTokensRaw(requestParameters: GetUserTokensRequest): Promise<runtime.ApiResponse<Array<TokenEntity>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getUserTokens.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling getUserTokens.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getUserTokens.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/users/{userId}/tokens`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TokenEntityFromJSON));
    }

    /**
     * List user\'s personal tokens
     */
    async getUserTokens(requestParameters: GetUserTokensRequest): Promise<Array<TokenEntity>> {
        const response = await this.getUserTokensRaw(requestParameters);
        return await response.value();
    }

    /**
     * List user\'s personal tokens
     */
    async getUserTokens1Raw(requestParameters: GetUserTokens1Request): Promise<runtime.ApiResponse<Array<TokenEntity>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getUserTokens1.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getUserTokens1.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/users/{userId}/tokens`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TokenEntityFromJSON));
    }

    /**
     * List user\'s personal tokens
     */
    async getUserTokens1(requestParameters: GetUserTokens1Request): Promise<Array<TokenEntity>> {
        const response = await this.getUserTokens1Raw(requestParameters);
        return await response.value();
    }

    /**
     * Revoke all user\'s personal tokens
     */
    async revokeAllTokensRaw(requestParameters: RevokeAllTokensRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling revokeAllTokens.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/user/tokens`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Revoke all user\'s personal tokens
     */
    async revokeAllTokens(requestParameters: RevokeAllTokensRequest): Promise<void> {
        await this.revokeAllTokensRaw(requestParameters);
    }

    /**
     * Revoke all user\'s personal tokens
     */
    async revokeAllTokens1Raw(requestParameters: RevokeAllTokens1Request): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling revokeAllTokens1.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling revokeAllTokens1.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/user/tokens`.replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Revoke all user\'s personal tokens
     */
    async revokeAllTokens1(requestParameters: RevokeAllTokens1Request): Promise<void> {
        await this.revokeAllTokens1Raw(requestParameters);
    }

    /**
     * Revoke a single user\'s personal tokens
     */
    async revokeTokenRaw(requestParameters: RevokeTokenRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.token === null || requestParameters.token === undefined) {
            throw new runtime.RequiredError('token','Required parameter requestParameters.token was null or undefined when calling revokeToken.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling revokeToken.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/user/tokens/{token}`.replace(`{${"token"}}`, encodeURIComponent(String(requestParameters.token))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Revoke a single user\'s personal tokens
     */
    async revokeToken(requestParameters: RevokeTokenRequest): Promise<void> {
        await this.revokeTokenRaw(requestParameters);
    }

    /**
     * Revoke a single user\'s personal tokens
     */
    async revokeToken1Raw(requestParameters: RevokeToken1Request): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.token === null || requestParameters.token === undefined) {
            throw new runtime.RequiredError('token','Required parameter requestParameters.token was null or undefined when calling revokeToken1.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling revokeToken1.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling revokeToken1.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/user/tokens/{token}`.replace(`{${"token"}}`, encodeURIComponent(String(requestParameters.token))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Revoke a single user\'s personal tokens
     */
    async revokeToken1(requestParameters: RevokeToken1Request): Promise<void> {
        await this.revokeToken1Raw(requestParameters);
    }

    /**
     * Revoke a single user\'s personal tokens
     */
    async revokeToken2Raw(requestParameters: RevokeToken2Request): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.token === null || requestParameters.token === undefined) {
            throw new runtime.RequiredError('token','Required parameter requestParameters.token was null or undefined when calling revokeToken2.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling revokeToken2.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling revokeToken2.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling revokeToken2.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/users/{userId}/tokens/{token}`.replace(`{${"token"}}`, encodeURIComponent(String(requestParameters.token))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Revoke a single user\'s personal tokens
     */
    async revokeToken2(requestParameters: RevokeToken2Request): Promise<void> {
        await this.revokeToken2Raw(requestParameters);
    }

    /**
     * Revoke a single user\'s personal tokens
     */
    async revokeToken3Raw(requestParameters: RevokeToken3Request): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.token === null || requestParameters.token === undefined) {
            throw new runtime.RequiredError('token','Required parameter requestParameters.token was null or undefined when calling revokeToken3.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling revokeToken3.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling revokeToken3.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/users/{userId}/tokens/{token}`.replace(`{${"token"}}`, encodeURIComponent(String(requestParameters.token))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Revoke a single user\'s personal tokens
     */
    async revokeToken3(requestParameters: RevokeToken3Request): Promise<void> {
        await this.revokeToken3Raw(requestParameters);
    }

}
