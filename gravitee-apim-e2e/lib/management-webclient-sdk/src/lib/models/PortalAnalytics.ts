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
 * @interface PortalAnalytics
 */
export interface PortalAnalytics {
    /**
     * 
     * @type {boolean}
     * @memberof PortalAnalytics
     */
    enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PortalAnalytics
     */
    trackingId?: string;
}

export function PortalAnalyticsFromJSON(json: any): PortalAnalytics {
    return PortalAnalyticsFromJSONTyped(json, false);
}

export function PortalAnalyticsFromJSONTyped(json: any, ignoreDiscriminator: boolean): PortalAnalytics {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'trackingId': !exists(json, 'trackingId') ? undefined : json['trackingId'],
    };
}

export function PortalAnalyticsToJSON(value?: PortalAnalytics | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enabled': value.enabled,
        'trackingId': value.trackingId,
    };
}


