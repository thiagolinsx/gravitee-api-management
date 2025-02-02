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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Failover
 */
export interface Failover {
    /**
     * 
     * @type {number}
     * @memberof Failover
     */
    maxAttempts?: number;
    /**
     * 
     * @type {number}
     * @memberof Failover
     */
    retryTimeout?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Failover
     */
    cases?: Array<FailoverCasesEnum>;
}

export function FailoverFromJSON(json: any): Failover {
    return FailoverFromJSONTyped(json, false);
}

export function FailoverFromJSONTyped(json: any, ignoreDiscriminator: boolean): Failover {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'maxAttempts': !exists(json, 'maxAttempts') ? undefined : json['maxAttempts'],
        'retryTimeout': !exists(json, 'retryTimeout') ? undefined : json['retryTimeout'],
        'cases': !exists(json, 'cases') ? undefined : json['cases'],
    };
}

export function FailoverToJSON(value?: Failover | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'maxAttempts': value.maxAttempts,
        'retryTimeout': value.retryTimeout,
        'cases': value.cases,
    };
}

/**
* @export
* @enum {string}
*/
export enum FailoverCasesEnum {
    TIMEOUT = 'TIMEOUT'
}


