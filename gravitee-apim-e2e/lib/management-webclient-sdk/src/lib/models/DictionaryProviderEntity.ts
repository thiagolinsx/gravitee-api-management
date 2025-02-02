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
 * @interface DictionaryProviderEntity
 */
export interface DictionaryProviderEntity {
    /**
     * 
     * @type {string}
     * @memberof DictionaryProviderEntity
     */
    type: string;
    /**
     * 
     * @type {any}
     * @memberof DictionaryProviderEntity
     */
    configuration: any;
}

export function DictionaryProviderEntityFromJSON(json: any): DictionaryProviderEntity {
    return DictionaryProviderEntityFromJSONTyped(json, false);
}

export function DictionaryProviderEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): DictionaryProviderEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'configuration': json['configuration'],
    };
}

export function DictionaryProviderEntityToJSON(value?: DictionaryProviderEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'configuration': value.configuration,
    };
}


