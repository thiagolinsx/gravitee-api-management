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
    AuditReferenceType,
    AuditReferenceTypeFromJSON,
    AuditReferenceTypeFromJSONTyped,
    AuditReferenceTypeToJSON,
} from './';

/**
 * 
 * @export
 * @interface AuditEntity
 */
export interface AuditEntity {
    /**
     * 
     * @type {Date}
     * @memberof AuditEntity
     */
    createdAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof AuditEntity
     */
    event?: string;
    /**
     * 
     * @type {string}
     * @memberof AuditEntity
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof AuditEntity
     */
    patch?: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof AuditEntity
     */
    properties?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof AuditEntity
     */
    referenceId?: string;
    /**
     * 
     * @type {AuditReferenceType}
     * @memberof AuditEntity
     */
    referenceType?: AuditReferenceType;
    /**
     * 
     * @type {string}
     * @memberof AuditEntity
     */
    user?: string;
}

export function AuditEntityFromJSON(json: any): AuditEntity {
    return AuditEntityFromJSONTyped(json, false);
}

export function AuditEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuditEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'event': !exists(json, 'event') ? undefined : json['event'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'patch': !exists(json, 'patch') ? undefined : json['patch'],
        'properties': !exists(json, 'properties') ? undefined : json['properties'],
        'referenceId': !exists(json, 'referenceId') ? undefined : json['referenceId'],
        'referenceType': !exists(json, 'referenceType') ? undefined : AuditReferenceTypeFromJSON(json['referenceType']),
        'user': !exists(json, 'user') ? undefined : json['user'],
    };
}

export function AuditEntityToJSON(value?: AuditEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'event': value.event,
        'id': value.id,
        'patch': value.patch,
        'properties': value.properties,
        'referenceId': value.referenceId,
        'referenceType': AuditReferenceTypeToJSON(value.referenceType),
        'user': value.user,
    };
}


