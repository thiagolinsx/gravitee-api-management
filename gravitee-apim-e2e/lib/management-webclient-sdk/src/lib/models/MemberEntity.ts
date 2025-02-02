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
import {
    MembershipMemberType,
    MembershipMemberTypeFromJSON,
    MembershipMemberTypeFromJSONTyped,
    MembershipMemberTypeToJSON,
    MembershipReferenceType,
    MembershipReferenceTypeFromJSON,
    MembershipReferenceTypeFromJSONTyped,
    MembershipReferenceTypeToJSON,
    RoleEntity,
    RoleEntityFromJSON,
    RoleEntityFromJSONTyped,
    RoleEntityToJSON,
} from './';

/**
 * 
 * @export
 * @interface MemberEntity
 */
export interface MemberEntity {
    /**
     * 
     * @type {string}
     * @memberof MemberEntity
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof MemberEntity
     */
    displayName?: string;
    /**
     * 
     * @type {string}
     * @memberof MemberEntity
     */
    email?: string;
    /**
     * 
     * @type {MembershipMemberType}
     * @memberof MemberEntity
     */
    type?: MembershipMemberType;
    /**
     * 
     * @type {MembershipReferenceType}
     * @memberof MemberEntity
     */
    referenceType?: MembershipReferenceType;
    /**
     * 
     * @type {string}
     * @memberof MemberEntity
     */
    referenceId?: string;
    /**
     * 
     * @type {Array<RoleEntity>}
     * @memberof MemberEntity
     */
    roles?: Array<RoleEntity>;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof MemberEntity
     */
    permissions?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {Date}
     * @memberof MemberEntity
     */
    created_at?: Date;
    /**
     * 
     * @type {Date}
     * @memberof MemberEntity
     */
    updated_at?: Date;
}

export function MemberEntityFromJSON(json: any): MemberEntity {
    return MemberEntityFromJSONTyped(json, false);
}

export function MemberEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): MemberEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'displayName': !exists(json, 'displayName') ? undefined : json['displayName'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'type': !exists(json, 'type') ? undefined : MembershipMemberTypeFromJSON(json['type']),
        'referenceType': !exists(json, 'referenceType') ? undefined : MembershipReferenceTypeFromJSON(json['referenceType']),
        'referenceId': !exists(json, 'referenceId') ? undefined : json['referenceId'],
        'roles': !exists(json, 'roles') ? undefined : ((json['roles'] as Array<any>).map(RoleEntityFromJSON)),
        'permissions': !exists(json, 'permissions') ? undefined : json['permissions'],
        'created_at': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updated_at': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
    };
}

export function MemberEntityToJSON(value?: MemberEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'displayName': value.displayName,
        'email': value.email,
        'type': MembershipMemberTypeToJSON(value.type),
        'referenceType': MembershipReferenceTypeToJSON(value.referenceType),
        'referenceId': value.referenceId,
        'roles': value.roles === undefined ? undefined : ((value.roles as Array<any>).map(RoleEntityToJSON)),
        'permissions': value.permissions,
        'created_at': value.created_at === undefined ? undefined : (value.created_at.toISOString()),
        'updated_at': value.updated_at === undefined ? undefined : (value.updated_at.toISOString()),
    };
}


