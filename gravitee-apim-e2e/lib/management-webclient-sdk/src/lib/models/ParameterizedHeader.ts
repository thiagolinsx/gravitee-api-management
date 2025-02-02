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
 * @interface ParameterizedHeader
 */
export interface ParameterizedHeader {
    /**
     * 
     * @type {string}
     * @memberof ParameterizedHeader
     */
    value?: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ParameterizedHeader
     */
    parameters?: { [key: string]: string; };
}

export function ParameterizedHeaderFromJSON(json: any): ParameterizedHeader {
    return ParameterizedHeaderFromJSONTyped(json, false);
}

export function ParameterizedHeaderFromJSONTyped(json: any, ignoreDiscriminator: boolean): ParameterizedHeader {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : json['value'],
        'parameters': !exists(json, 'parameters') ? undefined : json['parameters'],
    };
}

export function ParameterizedHeaderToJSON(value?: ParameterizedHeader | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
        'parameters': value.parameters,
    };
}


