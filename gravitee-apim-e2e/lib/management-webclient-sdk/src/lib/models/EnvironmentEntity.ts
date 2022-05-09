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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface EnvironmentEntity
 */
export interface EnvironmentEntity {
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    cockpitId?: string;
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    description?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof EnvironmentEntity
     */
    domainRestrictions?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof EnvironmentEntity
     */
    hrids?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof EnvironmentEntity
     */
    organizationId: string;
}

export function EnvironmentEntityFromJSON(json: any): EnvironmentEntity {
    return EnvironmentEntityFromJSONTyped(json, false);
}

export function EnvironmentEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): EnvironmentEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cockpitId': !exists(json, 'cockpitId') ? undefined : json['cockpitId'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'domainRestrictions': !exists(json, 'domainRestrictions') ? undefined : json['domainRestrictions'],
        'hrids': !exists(json, 'hrids') ? undefined : json['hrids'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': json['name'],
        'organizationId': json['organizationId'],
    };
}

export function EnvironmentEntityToJSON(value?: EnvironmentEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cockpitId': value.cockpitId,
        'description': value.description,
        'domainRestrictions': value.domainRestrictions,
        'hrids': value.hrids,
        'id': value.id,
        'name': value.name,
        'organizationId': value.organizationId,
    };
}


