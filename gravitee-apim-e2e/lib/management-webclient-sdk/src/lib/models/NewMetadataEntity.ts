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
    MetadataFormat,
    MetadataFormatFromJSON,
    MetadataFormatFromJSONTyped,
    MetadataFormatToJSON,
} from './';

/**
 * 
 * @export
 * @interface NewMetadataEntity
 */
export interface NewMetadataEntity {
    /**
     * 
     * @type {string}
     * @memberof NewMetadataEntity
     */
    name: string;
    /**
     * 
     * @type {MetadataFormat}
     * @memberof NewMetadataEntity
     */
    format?: MetadataFormat;
    /**
     * 
     * @type {string}
     * @memberof NewMetadataEntity
     */
    value?: string;
    /**
     * 
     * @type {boolean}
     * @memberof NewMetadataEntity
     */
    hidden?: boolean;
}

export function NewMetadataEntityFromJSON(json: any): NewMetadataEntity {
    return NewMetadataEntityFromJSONTyped(json, false);
}

export function NewMetadataEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): NewMetadataEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'format': !exists(json, 'format') ? undefined : MetadataFormatFromJSON(json['format']),
        'value': !exists(json, 'value') ? undefined : json['value'],
        'hidden': !exists(json, 'hidden') ? undefined : json['hidden'],
    };
}

export function NewMetadataEntityToJSON(value?: NewMetadataEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'format': MetadataFormatToJSON(value.format),
        'value': value.value,
        'hidden': value.hidden,
    };
}


