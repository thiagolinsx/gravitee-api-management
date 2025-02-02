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
    AccessControlEntity,
    AccessControlEntityFromJSON,
    AccessControlEntityFromJSONTyped,
    AccessControlEntityToJSON,
    PageMediaEntity,
    PageMediaEntityFromJSON,
    PageMediaEntityFromJSONTyped,
    PageMediaEntityToJSON,
    PageRevisionId,
    PageRevisionIdFromJSON,
    PageRevisionIdFromJSONTyped,
    PageRevisionIdToJSON,
    PageSourceEntity,
    PageSourceEntityFromJSON,
    PageSourceEntityFromJSONTyped,
    PageSourceEntityToJSON,
    Visibility,
    VisibilityFromJSON,
    VisibilityFromJSONTyped,
    VisibilityToJSON,
} from './';

/**
 * 
 * @export
 * @interface PageEntity
 */
export interface PageEntity {
    /**
     * 
     * @type {string}
     * @memberof PageEntity
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof PageEntity
     */
    crossId?: string;
    /**
     * 
     * @type {string}
     * @memberof PageEntity
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof PageEntity
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof PageEntity
     */
    content?: string;
    /**
     * 
     * @type {number}
     * @memberof PageEntity
     */
    order?: number;
    /**
     * 
     * @type {string}
     * @memberof PageEntity
     */
    lastContributor?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PageEntity
     */
    published?: boolean;
    /**
     * 
     * @type {Visibility}
     * @memberof PageEntity
     */
    visibility?: Visibility;
    /**
     * 
     * @type {Date}
     * @memberof PageEntity
     */
    lastModificationDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof PageEntity
     */
    contentType?: string;
    /**
     * 
     * @type {PageSourceEntity}
     * @memberof PageEntity
     */
    source?: PageSourceEntity;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof PageEntity
     */
    configuration?: { [key: string]: string; };
    /**
     * 
     * @type {boolean}
     * @memberof PageEntity
     */
    homepage?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PageEntity
     */
    parentId?: string;
    /**
     * 
     * @type {string}
     * @memberof PageEntity
     */
    parentPath?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PageEntity
     */
    excludedAccessControls?: boolean;
    /**
     * 
     * @type {Array<AccessControlEntity>}
     * @memberof PageEntity
     */
    accessControls?: Array<AccessControlEntity>;
    /**
     * 
     * @type {Array<string>}
     * @memberof PageEntity
     */
    messages?: Array<string>;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof PageEntity
     */
    metadata?: { [key: string]: string; };
    /**
     * 
     * @type {Array<PageEntity>}
     * @memberof PageEntity
     */
    translations?: Array<PageEntity>;
    /**
     * 
     * @type {boolean}
     * @memberof PageEntity
     */
    readonly generalConditions?: boolean;
    /**
     * 
     * @type {PageRevisionId}
     * @memberof PageEntity
     */
    contentRevisionId?: PageRevisionId;
    /**
     * 
     * @type {Array<string>}
     * @memberof PageEntity
     */
    excluded_groups?: Array<string>;
    /**
     * 
     * @type {Array<PageMediaEntity>}
     * @memberof PageEntity
     */
    attached_media?: Array<PageMediaEntity>;
}

export function PageEntityFromJSON(json: any): PageEntity {
    return PageEntityFromJSONTyped(json, false);
}

export function PageEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'crossId': !exists(json, 'crossId') ? undefined : json['crossId'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'content': !exists(json, 'content') ? undefined : json['content'],
        'order': !exists(json, 'order') ? undefined : json['order'],
        'lastContributor': !exists(json, 'lastContributor') ? undefined : json['lastContributor'],
        'published': !exists(json, 'published') ? undefined : json['published'],
        'visibility': !exists(json, 'visibility') ? undefined : VisibilityFromJSON(json['visibility']),
        'lastModificationDate': !exists(json, 'lastModificationDate') ? undefined : (new Date(json['lastModificationDate'])),
        'contentType': !exists(json, 'contentType') ? undefined : json['contentType'],
        'source': !exists(json, 'source') ? undefined : PageSourceEntityFromJSON(json['source']),
        'configuration': !exists(json, 'configuration') ? undefined : json['configuration'],
        'homepage': !exists(json, 'homepage') ? undefined : json['homepage'],
        'parentId': !exists(json, 'parentId') ? undefined : json['parentId'],
        'parentPath': !exists(json, 'parentPath') ? undefined : json['parentPath'],
        'excludedAccessControls': !exists(json, 'excludedAccessControls') ? undefined : json['excludedAccessControls'],
        'accessControls': !exists(json, 'accessControls') ? undefined : ((json['accessControls'] as Array<any>).map(AccessControlEntityFromJSON)),
        'messages': !exists(json, 'messages') ? undefined : json['messages'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'translations': !exists(json, 'translations') ? undefined : ((json['translations'] as Array<any>).map(PageEntityFromJSON)),
        'generalConditions': !exists(json, 'generalConditions') ? undefined : json['generalConditions'],
        'contentRevisionId': !exists(json, 'contentRevisionId') ? undefined : PageRevisionIdFromJSON(json['contentRevisionId']),
        'excluded_groups': !exists(json, 'excluded_groups') ? undefined : json['excluded_groups'],
        'attached_media': !exists(json, 'attached_media') ? undefined : ((json['attached_media'] as Array<any>).map(PageMediaEntityFromJSON)),
    };
}

export function PageEntityToJSON(value?: PageEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'crossId': value.crossId,
        'name': value.name,
        'type': value.type,
        'content': value.content,
        'order': value.order,
        'lastContributor': value.lastContributor,
        'published': value.published,
        'visibility': VisibilityToJSON(value.visibility),
        'lastModificationDate': value.lastModificationDate === undefined ? undefined : (value.lastModificationDate.toISOString()),
        'contentType': value.contentType,
        'source': PageSourceEntityToJSON(value.source),
        'configuration': value.configuration,
        'homepage': value.homepage,
        'parentId': value.parentId,
        'parentPath': value.parentPath,
        'excludedAccessControls': value.excludedAccessControls,
        'accessControls': value.accessControls === undefined ? undefined : ((value.accessControls as Array<any>).map(AccessControlEntityToJSON)),
        'messages': value.messages,
        'metadata': value.metadata,
        'translations': value.translations === undefined ? undefined : ((value.translations as Array<any>).map(PageEntityToJSON)),
        'contentRevisionId': PageRevisionIdToJSON(value.contentRevisionId),
        'excluded_groups': value.excluded_groups,
        'attached_media': value.attached_media === undefined ? undefined : ((value.attached_media as Array<any>).map(PageMediaEntityToJSON)),
    };
}


