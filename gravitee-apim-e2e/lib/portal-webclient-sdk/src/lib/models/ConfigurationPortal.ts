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
import {
    ConfigurationPortalAnalytics,
    ConfigurationPortalAnalyticsFromJSON,
    ConfigurationPortalAnalyticsFromJSONTyped,
    ConfigurationPortalAnalyticsToJSON,
    ConfigurationPortalApis,
    ConfigurationPortalApisFromJSON,
    ConfigurationPortalApisFromJSONTyped,
    ConfigurationPortalApisToJSON,
    ConfigurationPortalMedia,
    ConfigurationPortalMediaFromJSON,
    ConfigurationPortalMediaFromJSONTyped,
    ConfigurationPortalMediaToJSON,
    ConfigurationPortalRating,
    ConfigurationPortalRatingFromJSON,
    ConfigurationPortalRatingFromJSONTyped,
    ConfigurationPortalRatingToJSON,
    Enabled,
    EnabledFromJSON,
    EnabledFromJSONTyped,
    EnabledToJSON,
} from './';

/**
 * 
 * @export
 * @interface ConfigurationPortal
 */
export interface ConfigurationPortal {
    /**
     * The portal Title
     * @type {string}
     * @memberof ConfigurationPortal
     */
    title?: string;
    /**
     * Default entrypoint of the gateway.
     * @type {string}
     * @memberof ConfigurationPortal
     */
    entrypoint?: string;
    /**
     * Api-key Header. Used by portal to display the CURL command.
     * @type {string}
     * @memberof ConfigurationPortal
     */
    apikeyHeader?: string;
    /**
     * 
     * @type {Enabled}
     * @memberof ConfigurationPortal
     */
    support?: Enabled;
    /**
     * 
     * @type {Enabled}
     * @memberof ConfigurationPortal
     */
    applicationCreation?: Enabled;
    /**
     * 
     * @type {Enabled}
     * @memberof ConfigurationPortal
     */
    userCreation?: Enabled;
    /**
     * 
     * @type {ConfigurationPortalApis}
     * @memberof ConfigurationPortal
     */
    apis?: ConfigurationPortalApis;
    /**
     * 
     * @type {ConfigurationPortalAnalytics}
     * @memberof ConfigurationPortal
     */
    analytics?: ConfigurationPortalAnalytics;
    /**
     * 
     * @type {ConfigurationPortalRating}
     * @memberof ConfigurationPortal
     */
    rating?: ConfigurationPortalRating;
    /**
     * 
     * @type {ConfigurationPortalMedia}
     * @memberof ConfigurationPortal
     */
    uploadMedia?: ConfigurationPortalMedia;
    /**
     * Main phrase to display on the homepage.
     * @type {string}
     * @memberof ConfigurationPortal
     */
    homepageTitle?: string;
}

export function ConfigurationPortalFromJSON(json: any): ConfigurationPortal {
    return ConfigurationPortalFromJSONTyped(json, false);
}

export function ConfigurationPortalFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConfigurationPortal {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'title': !exists(json, 'title') ? undefined : json['title'],
        'entrypoint': !exists(json, 'entrypoint') ? undefined : json['entrypoint'],
        'apikeyHeader': !exists(json, 'apikeyHeader') ? undefined : json['apikeyHeader'],
        'support': !exists(json, 'support') ? undefined : EnabledFromJSON(json['support']),
        'applicationCreation': !exists(json, 'applicationCreation') ? undefined : EnabledFromJSON(json['applicationCreation']),
        'userCreation': !exists(json, 'userCreation') ? undefined : EnabledFromJSON(json['userCreation']),
        'apis': !exists(json, 'apis') ? undefined : ConfigurationPortalApisFromJSON(json['apis']),
        'analytics': !exists(json, 'analytics') ? undefined : ConfigurationPortalAnalyticsFromJSON(json['analytics']),
        'rating': !exists(json, 'rating') ? undefined : ConfigurationPortalRatingFromJSON(json['rating']),
        'uploadMedia': !exists(json, 'uploadMedia') ? undefined : ConfigurationPortalMediaFromJSON(json['uploadMedia']),
        'homepageTitle': !exists(json, 'homepageTitle') ? undefined : json['homepageTitle'],
    };
}

export function ConfigurationPortalToJSON(value?: ConfigurationPortal | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'entrypoint': value.entrypoint,
        'apikeyHeader': value.apikeyHeader,
        'support': EnabledToJSON(value.support),
        'applicationCreation': EnabledToJSON(value.applicationCreation),
        'userCreation': EnabledToJSON(value.userCreation),
        'apis': ConfigurationPortalApisToJSON(value.apis),
        'analytics': ConfigurationPortalAnalyticsToJSON(value.analytics),
        'rating': ConfigurationPortalRatingToJSON(value.rating),
        'uploadMedia': ConfigurationPortalMediaToJSON(value.uploadMedia),
        'homepageTitle': value.homepageTitle,
    };
}


