/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
        gvType(selector: string, value: string): Chainable<Element>;

        /**
         * Custom command to setup authentication token/cookie to visit directly some pages instead of
         * going to the login page first
         *
         * @param username Username to use for authentication
         * @param password Password to use for authentication
         */
        loginInAPIM(username?: string, password?: string): Chainable<Element>;
    }
}

Cypress.Commands.add("gvType", (selector, value) => {
    cy.get(selector).within(() => cy.get("input").focus().type(value, { force: true }).trigger("input", { bubbles: true, composed: true }));
});

Cypress.Commands.add("loginInAPIM", (username: string = "admin", password: string = "admin") => {
    cy.clearCookie("Auth-Graviteeio-APIM");
    cy.request({
        method: "POST",
        url: `${Cypress.env("MANAGEMENT_API_URL")}/management/organizations/DEFAULT/user/login`,
        auth: { username, password },
    });
});
