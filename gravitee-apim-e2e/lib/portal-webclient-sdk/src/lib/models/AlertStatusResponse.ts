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
/**
 * 
 * @export
 * @interface AlertStatusResponse
 */
export interface AlertStatusResponse {
    /**
     * Number of available plugins.
     * @type {number}
     * @memberof AlertStatusResponse
     */
    available_plugins?: number;
    /**
     * Is alerting enabled
     * @type {boolean}
     * @memberof AlertStatusResponse
     */
    enabled?: boolean;
}

export function AlertStatusResponseFromJSON(json: any): AlertStatusResponse {
    return AlertStatusResponseFromJSONTyped(json, false);
}

export function AlertStatusResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlertStatusResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'available_plugins': !exists(json, 'available_plugins') ? undefined : json['available_plugins'],
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
    };
}

export function AlertStatusResponseToJSON(value?: AlertStatusResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'available_plugins': value.available_plugins,
        'enabled': value.enabled,
    };
}


