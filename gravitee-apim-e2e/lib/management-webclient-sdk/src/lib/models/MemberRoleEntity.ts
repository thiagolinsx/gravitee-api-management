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
    RoleScope,
    RoleScopeFromJSON,
    RoleScopeFromJSONTyped,
    RoleScopeToJSON,
} from './';

/**
 * 
 * @export
 * @interface MemberRoleEntity
 */
export interface MemberRoleEntity {
    /**
     * 
     * @type {string}
     * @memberof MemberRoleEntity
     */
    name?: string;
    /**
     * 
     * @type {RoleScope}
     * @memberof MemberRoleEntity
     */
    scope?: RoleScope;
}

export function MemberRoleEntityFromJSON(json: any): MemberRoleEntity {
    return MemberRoleEntityFromJSONTyped(json, false);
}

export function MemberRoleEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): MemberRoleEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'scope': !exists(json, 'scope') ? undefined : RoleScopeFromJSON(json['scope']),
    };
}

export function MemberRoleEntityToJSON(value?: MemberRoleEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'scope': RoleScopeToJSON(value.scope),
    };
}


