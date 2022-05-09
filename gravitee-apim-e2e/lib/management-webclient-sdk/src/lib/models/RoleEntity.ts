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
 * @interface RoleEntity
 */
export interface RoleEntity {
    /**
     * 
     * @type {boolean}
     * @memberof RoleEntity
     */
    apiPrimaryOwner?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof RoleEntity
     */
    _default?: boolean;
    /**
     * 
     * @type {string}
     * @memberof RoleEntity
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof RoleEntity
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof RoleEntity
     */
    name?: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof RoleEntity
     */
    permissions?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {RoleScope}
     * @memberof RoleEntity
     */
    scope?: RoleScope;
    /**
     * 
     * @type {boolean}
     * @memberof RoleEntity
     */
    system?: boolean;
}

export function RoleEntityFromJSON(json: any): RoleEntity {
    return RoleEntityFromJSONTyped(json, false);
}

export function RoleEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoleEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'apiPrimaryOwner': !exists(json, 'apiPrimaryOwner') ? undefined : json['apiPrimaryOwner'],
        '_default': !exists(json, 'default') ? undefined : json['default'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'permissions': !exists(json, 'permissions') ? undefined : json['permissions'],
        'scope': !exists(json, 'scope') ? undefined : RoleScopeFromJSON(json['scope']),
        'system': !exists(json, 'system') ? undefined : json['system'],
    };
}

export function RoleEntityToJSON(value?: RoleEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'apiPrimaryOwner': value.apiPrimaryOwner,
        'default': value._default,
        'description': value.description,
        'id': value.id,
        'name': value.name,
        'permissions': value.permissions,
        'scope': RoleScopeToJSON(value.scope),
        'system': value.system,
    };
}


