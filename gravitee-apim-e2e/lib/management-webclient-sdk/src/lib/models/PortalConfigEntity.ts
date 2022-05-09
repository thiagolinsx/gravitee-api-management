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
    Analytics,
    AnalyticsFromJSON,
    AnalyticsFromJSONTyped,
    AnalyticsToJSON,
    Api,
    ApiFromJSON,
    ApiFromJSONTyped,
    ApiToJSON,
    ApiQualityMetrics,
    ApiQualityMetricsFromJSON,
    ApiQualityMetricsFromJSONTyped,
    ApiQualityMetricsToJSON,
    ApiReview,
    ApiReviewFromJSON,
    ApiReviewFromJSONTyped,
    ApiReviewToJSON,
    Application,
    ApplicationFromJSON,
    ApplicationFromJSONTyped,
    ApplicationToJSON,
    Company,
    CompanyFromJSON,
    CompanyFromJSONTyped,
    CompanyToJSON,
    Dashboards,
    DashboardsFromJSON,
    DashboardsFromJSONTyped,
    DashboardsToJSON,
    Documentation,
    DocumentationFromJSON,
    DocumentationFromJSONTyped,
    DocumentationToJSON,
    OpenAPIDocViewer,
    OpenAPIDocViewerFromJSON,
    OpenAPIDocViewerFromJSONTyped,
    OpenAPIDocViewerToJSON,
    Plan,
    PlanFromJSON,
    PlanFromJSONTyped,
    PlanToJSON,
    Portal,
    PortalFromJSON,
    PortalFromJSONTyped,
    PortalToJSON,
    PortalAuthentication,
    PortalAuthenticationFromJSON,
    PortalAuthenticationFromJSONTyped,
    PortalAuthenticationToJSON,
    PortalReCaptcha,
    PortalReCaptchaFromJSON,
    PortalReCaptchaFromJSONTyped,
    PortalReCaptchaToJSON,
    PortalScheduler,
    PortalSchedulerFromJSON,
    PortalSchedulerFromJSONTyped,
    PortalSchedulerToJSON,
} from './';

/**
 * 
 * @export
 * @interface PortalConfigEntity
 */
export interface PortalConfigEntity {
    /**
     * 
     * @type {Analytics}
     * @memberof PortalConfigEntity
     */
    analytics?: Analytics;
    /**
     * 
     * @type {Api}
     * @memberof PortalConfigEntity
     */
    api?: Api;
    /**
     * 
     * @type {ApiQualityMetrics}
     * @memberof PortalConfigEntity
     */
    apiQualityMetrics?: ApiQualityMetrics;
    /**
     * 
     * @type {ApiReview}
     * @memberof PortalConfigEntity
     */
    apiReview?: ApiReview;
    /**
     * 
     * @type {Application}
     * @memberof PortalConfigEntity
     */
    application?: Application;
    /**
     * 
     * @type {PortalAuthentication}
     * @memberof PortalConfigEntity
     */
    authentication?: PortalAuthentication;
    /**
     * 
     * @type {Company}
     * @memberof PortalConfigEntity
     */
    company?: Company;
    /**
     * 
     * @type {Dashboards}
     * @memberof PortalConfigEntity
     */
    dashboards?: Dashboards;
    /**
     * 
     * @type {Documentation}
     * @memberof PortalConfigEntity
     */
    documentation?: Documentation;
    /**
     * 
     * @type {OpenAPIDocViewer}
     * @memberof PortalConfigEntity
     */
    openAPIDocViewer?: OpenAPIDocViewer;
    /**
     * 
     * @type {Plan}
     * @memberof PortalConfigEntity
     */
    plan?: Plan;
    /**
     * 
     * @type {Portal}
     * @memberof PortalConfigEntity
     */
    portal?: Portal;
    /**
     * 
     * @type {PortalReCaptcha}
     * @memberof PortalConfigEntity
     */
    reCaptcha?: PortalReCaptcha;
    /**
     * 
     * @type {PortalScheduler}
     * @memberof PortalConfigEntity
     */
    scheduler?: PortalScheduler;
}

export function PortalConfigEntityFromJSON(json: any): PortalConfigEntity {
    return PortalConfigEntityFromJSONTyped(json, false);
}

export function PortalConfigEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): PortalConfigEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'analytics': !exists(json, 'analytics') ? undefined : AnalyticsFromJSON(json['analytics']),
        'api': !exists(json, 'api') ? undefined : ApiFromJSON(json['api']),
        'apiQualityMetrics': !exists(json, 'apiQualityMetrics') ? undefined : ApiQualityMetricsFromJSON(json['apiQualityMetrics']),
        'apiReview': !exists(json, 'apiReview') ? undefined : ApiReviewFromJSON(json['apiReview']),
        'application': !exists(json, 'application') ? undefined : ApplicationFromJSON(json['application']),
        'authentication': !exists(json, 'authentication') ? undefined : PortalAuthenticationFromJSON(json['authentication']),
        'company': !exists(json, 'company') ? undefined : CompanyFromJSON(json['company']),
        'dashboards': !exists(json, 'dashboards') ? undefined : DashboardsFromJSON(json['dashboards']),
        'documentation': !exists(json, 'documentation') ? undefined : DocumentationFromJSON(json['documentation']),
        'openAPIDocViewer': !exists(json, 'openAPIDocViewer') ? undefined : OpenAPIDocViewerFromJSON(json['openAPIDocViewer']),
        'plan': !exists(json, 'plan') ? undefined : PlanFromJSON(json['plan']),
        'portal': !exists(json, 'portal') ? undefined : PortalFromJSON(json['portal']),
        'reCaptcha': !exists(json, 'reCaptcha') ? undefined : PortalReCaptchaFromJSON(json['reCaptcha']),
        'scheduler': !exists(json, 'scheduler') ? undefined : PortalSchedulerFromJSON(json['scheduler']),
    };
}

export function PortalConfigEntityToJSON(value?: PortalConfigEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'analytics': AnalyticsToJSON(value.analytics),
        'api': ApiToJSON(value.api),
        'apiQualityMetrics': ApiQualityMetricsToJSON(value.apiQualityMetrics),
        'apiReview': ApiReviewToJSON(value.apiReview),
        'application': ApplicationToJSON(value.application),
        'authentication': PortalAuthenticationToJSON(value.authentication),
        'company': CompanyToJSON(value.company),
        'dashboards': DashboardsToJSON(value.dashboards),
        'documentation': DocumentationToJSON(value.documentation),
        'openAPIDocViewer': OpenAPIDocViewerToJSON(value.openAPIDocViewer),
        'plan': PlanToJSON(value.plan),
        'portal': PortalToJSON(value.portal),
        'reCaptcha': PortalReCaptchaToJSON(value.reCaptcha),
        'scheduler': PortalSchedulerToJSON(value.scheduler),
    };
}


