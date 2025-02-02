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
 * @interface RoleMappingEntity
 */
export interface RoleMappingEntity {
    /**
     * 
     * @type {string}
     * @memberof RoleMappingEntity
     */
    condition?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof RoleMappingEntity
     */
    organizations: Array<string>;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof RoleMappingEntity
     */
    environments: { [key: string]: Array<string>; };
}

export function RoleMappingEntityFromJSON(json: any): RoleMappingEntity {
    return RoleMappingEntityFromJSONTyped(json, false);
}

export function RoleMappingEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoleMappingEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'condition': !exists(json, 'condition') ? undefined : json['condition'],
        'organizations': json['organizations'],
        'environments': json['environments'],
    };
}

export function RoleMappingEntityToJSON(value?: RoleMappingEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'condition': value.condition,
        'organizations': value.organizations,
        'environments': value.environments,
    };
}


