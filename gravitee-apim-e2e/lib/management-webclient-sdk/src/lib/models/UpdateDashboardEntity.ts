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
import {
    DashboardReferenceType,
    DashboardReferenceTypeFromJSON,
    DashboardReferenceTypeFromJSONTyped,
    DashboardReferenceTypeToJSON,
} from './';

/**
 * 
 * @export
 * @interface UpdateDashboardEntity
 */
export interface UpdateDashboardEntity {
    /**
     * 
     * @type {string}
     * @memberof UpdateDashboardEntity
     */
    definition?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateDashboardEntity
     */
    enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdateDashboardEntity
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateDashboardEntity
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateDashboardEntity
     */
    order: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateDashboardEntity
     */
    query_filter?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateDashboardEntity
     */
    reference_id: string;
    /**
     * 
     * @type {DashboardReferenceType}
     * @memberof UpdateDashboardEntity
     */
    reference_type: DashboardReferenceType;
}

export function UpdateDashboardEntityFromJSON(json: any): UpdateDashboardEntity {
    return UpdateDashboardEntityFromJSONTyped(json, false);
}

export function UpdateDashboardEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateDashboardEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'definition': !exists(json, 'definition') ? undefined : json['definition'],
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': json['name'],
        'order': json['order'],
        'query_filter': !exists(json, 'query_filter') ? undefined : json['query_filter'],
        'reference_id': json['reference_id'],
        'reference_type': DashboardReferenceTypeFromJSON(json['reference_type']),
    };
}

export function UpdateDashboardEntityToJSON(value?: UpdateDashboardEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'definition': value.definition,
        'enabled': value.enabled,
        'id': value.id,
        'name': value.name,
        'order': value.order,
        'query_filter': value.query_filter,
        'reference_id': value.reference_id,
        'reference_type': DashboardReferenceTypeToJSON(value.reference_type),
    };
}


