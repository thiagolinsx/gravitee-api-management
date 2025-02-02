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
    Condition,
    ConditionFromJSON,
    ConditionFromJSONTyped,
    ConditionToJSON,
    Projection,
    ProjectionFromJSON,
    ProjectionFromJSONTyped,
    ProjectionToJSON,
    StringCompareConditionAllOf,
    StringCompareConditionAllOfFromJSON,
    StringCompareConditionAllOfFromJSONTyped,
    StringCompareConditionAllOfToJSON,
} from './';

/**
 * 
 * @export
 * @interface StringCompareCondition
 */
export interface StringCompareCondition extends Condition {
    /**
     * 
     * @type {string}
     * @memberof StringCompareCondition
     */
    property: string;
    /**
     * 
     * @type {string}
     * @memberof StringCompareCondition
     */
    operator: StringCompareConditionOperatorEnum;
    /**
     * 
     * @type {string}
     * @memberof StringCompareCondition
     */
    property2: string;
    /**
     * 
     * @type {boolean}
     * @memberof StringCompareCondition
     */
    ignoreCase?: boolean;
}

export function StringCompareConditionFromJSON(json: any): StringCompareCondition {
    return StringCompareConditionFromJSONTyped(json, false);
}

export function StringCompareConditionFromJSONTyped(json: any, ignoreDiscriminator: boolean): StringCompareCondition {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...ConditionFromJSONTyped(json, ignoreDiscriminator),
        'property': json['property'],
        'operator': json['operator'],
        'property2': json['property2'],
        'ignoreCase': !exists(json, 'ignoreCase') ? undefined : json['ignoreCase'],
    };
}

export function StringCompareConditionToJSON(value?: StringCompareCondition | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...ConditionToJSON(value),
        'property': value.property,
        'operator': value.operator,
        'property2': value.property2,
        'ignoreCase': value.ignoreCase,
    };
}

/**
* @export
* @enum {string}
*/
export enum StringCompareConditionOperatorEnum {
    EQUALS = 'EQUALS',
    NOTEQUALS = 'NOT_EQUALS',
    STARTSWITH = 'STARTS_WITH',
    ENDSWITH = 'ENDS_WITH',
    CONTAINS = 'CONTAINS',
    MATCHES = 'MATCHES'
}


