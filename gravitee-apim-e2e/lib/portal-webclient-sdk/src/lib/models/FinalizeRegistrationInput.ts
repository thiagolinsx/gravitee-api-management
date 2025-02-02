/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface FinalizeRegistrationInput
 */
export interface FinalizeRegistrationInput {
    /**
     * Token of the registered user to be validated.
     * @type {string}
     * @memberof FinalizeRegistrationInput
     */
    token: string;
    /**
     * Password of the registered user.
     * @type {string}
     * @memberof FinalizeRegistrationInput
     */
    password: string;
    /**
     * First name of the registered user.
     * @type {string}
     * @memberof FinalizeRegistrationInput
     */
    firstname: string;
    /**
     * Last name of the registered user.
     * @type {string}
     * @memberof FinalizeRegistrationInput
     */
    lastname: string;
}

export function FinalizeRegistrationInputFromJSON(json: any): FinalizeRegistrationInput {
    return FinalizeRegistrationInputFromJSONTyped(json, false);
}

export function FinalizeRegistrationInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): FinalizeRegistrationInput {
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

export function FinalizeRegistrationInputToJSON(value?: FinalizeRegistrationInput | null): any {
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


