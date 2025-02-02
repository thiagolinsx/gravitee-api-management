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
 * @interface ResetPasswordUserEntity
 */
export interface ResetPasswordUserEntity {
    /**
     * 
     * @type {string}
     * @memberof ResetPasswordUserEntity
     */
    token: string;
    /**
     * 
     * @type {string}
     * @memberof ResetPasswordUserEntity
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof ResetPasswordUserEntity
     */
    firstname: string;
    /**
     * 
     * @type {string}
     * @memberof ResetPasswordUserEntity
     */
    lastname: string;
}

export function ResetPasswordUserEntityFromJSON(json: any): ResetPasswordUserEntity {
    return ResetPasswordUserEntityFromJSONTyped(json, false);
}

export function ResetPasswordUserEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResetPasswordUserEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'token': json['token'],
        'password': json['password'],
        'firstname': json['firstname'],
        'lastname': json['lastname'],
    };
}

export function ResetPasswordUserEntityToJSON(value?: ResetPasswordUserEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'token': value.token,
        'password': value.password,
        'firstname': value.firstname,
        'lastname': value.lastname,
    };
}


