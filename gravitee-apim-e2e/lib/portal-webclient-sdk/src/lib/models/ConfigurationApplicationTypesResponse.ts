/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    ApplicationType,
    ApplicationTypeFromJSON,
    ApplicationTypeFromJSONTyped,
    ApplicationTypeToJSON,
} from './';

/**
 * 
 * @export
 * @interface ConfigurationApplicationTypesResponse
 */
export interface ConfigurationApplicationTypesResponse {
    /**
     * List of application types
     * @type {Array<ApplicationType>}
     * @memberof ConfigurationApplicationTypesResponse
     */
    data?: Array<ApplicationType>;
}

export function ConfigurationApplicationTypesResponseFromJSON(json: any): ConfigurationApplicationTypesResponse {
    return ConfigurationApplicationTypesResponseFromJSONTyped(json, false);
}

export function ConfigurationApplicationTypesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConfigurationApplicationTypesResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(ApplicationTypeFromJSON)),
    };
}

export function ConfigurationApplicationTypesResponseToJSON(value?: ConfigurationApplicationTypesResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(ApplicationTypeToJSON)),
    };
}


