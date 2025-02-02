/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io - Management API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.18.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ConsoleConfigEntity,
    ConsoleConfigEntityFromJSON,
    ConsoleConfigEntityToJSON,
    ConsoleSettingsEntity,
    ConsoleSettingsEntityFromJSON,
    ConsoleSettingsEntityToJSON,
} from '../models';

export interface GetConsoleConfigRequest {
    orgId: string;
}

export interface SaveConsoleConfigRequest {
    orgId: string;
    consoleSettingsEntity: ConsoleSettingsEntity;
}

/**
 * 
 */
export class ConsoleApi extends runtime.BaseAPI {

    /**
     * Every users can use this service
     * Get the console configuration needed for runtime
     */
    async getConsoleConfigRaw(requestParameters: GetConsoleConfigRequest): Promise<runtime.ApiResponse<ConsoleConfigEntity>> {
        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getConsoleConfig.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/console`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsoleConfigEntityFromJSON(jsonValue));
    }

    /**
     * Every users can use this service
     * Get the console configuration needed for runtime
     */
    async getConsoleConfig(requestParameters: GetConsoleConfigRequest): Promise<ConsoleConfigEntity> {
        const response = await this.getConsoleConfigRaw(requestParameters);
        return await response.value();
    }

    /**
     * Save the console configuration
     */
    async saveConsoleConfigRaw(requestParameters: SaveConsoleConfigRequest): Promise<runtime.ApiResponse<ConsoleSettingsEntity>> {
        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling saveConsoleConfig.');
        }

        if (requestParameters.consoleSettingsEntity === null || requestParameters.consoleSettingsEntity === undefined) {
            throw new runtime.RequiredError('consoleSettingsEntity','Required parameter requestParameters.consoleSettingsEntity was null or undefined when calling saveConsoleConfig.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/console`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ConsoleSettingsEntityToJSON(requestParameters.consoleSettingsEntity),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ConsoleSettingsEntityFromJSON(jsonValue));
    }

    /**
     * Save the console configuration
     */
    async saveConsoleConfig(requestParameters: SaveConsoleConfigRequest): Promise<ConsoleSettingsEntity> {
        const response = await this.saveConsoleConfigRaw(requestParameters);
        return await response.value();
    }

}
