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
import { ADMIN_USER } from 'fixtures/fakers/users/users';

describe('Complete UI-flow to import an API', () => {
  it(`should successfully login`, () => {
    cy.clearCookie('Auth-Graviteeio-APIM');
    cy.visit(`${Cypress.env('managementUI')}`);
    cy.url().should('contain', 'login');

    cy.get('.title').should('be.visible');
    cy.get('.title').contains('Sign In');
    cy.contains('Sign up').invoke('attr', 'href').then(href => cy.request(`${Cypress.env('managementUI')}/${href}`).ok());
    // cy.get('button.btn-signin').invoke('attr', 'disabled').should('eq', 'disabled');   // is actually not disabled - bug?

    cy.get('#input_0').type(ADMIN_USER.username);
    cy.get('#input_1').type(ADMIN_USER.password);

    cy.get('.btn').click();
    cy.contains('Home board');
  });

  it('should call the APIs page', () => {
    cy.visit(`${Cypress.env('managementUI')}/#!/environments/DEFAULT/apis/`);
    cy.url().should('contain', 'apis');
  })

  it('should remove newsletter box', () => {
    // todo: want to check for existence first? Or is it safe to assume that it's always present when this test runs
    cy.get('.newsletter-title-box').should('be.visible');
    cy.get('.newsletter-title-box > a').click();
    cy.get('.newsletter-title-box').should('not.be.visible');
  })

// test fails, manually in UI it works fine
  it('should not find endpoint of the API to be imported when searching for it', () => {
    cy.get('input.apis-filter').type('/cypress-test-petstore');
    cy.get('button.gv-search-button').click().should(() => {
      cy.contains('No APIs found').should('exist');
    });
  })

  it('should click on the plus button', () => {
    cy.get('[ui-sref="management.apis.new"]').click();
    cy.url().should('contain', 'new');
    cy.get('span.title').should('contain', 'Design studio').should('be.visible');
    cy.contains('Create an API').should('be.visible');
  })

  it('should click on Import', () => {
      cy.get('[icon="general:upload"]').shadow().find('button').click({force: true});
      cy.get('div.title').should('contain', 'Import Design studio').should('be.visible');
      cy.get('md-dialog-actions > div > button').should(($dialogButtons) => {
        expect($dialogButtons).to.have.lengthOf(2);
        expect($dialogButtons[0]).contain('Cancel'); //.and('be.visible');
        expect($dialogButtons[1]).contain('Import'); //.and.to.have.attr('disabled');
      }) 
    })

// test fails, click on 'Import from Link' tab doesn't work
    it('should click on "Import from link" tab', () => {
      cy.contains('Import from link').focus();
      cy.get('.md-tab[tabindex=\'-1\']').click();
      // cy.get('.md-tab[tabindex=\'0\']').focus().click();
      cy.wait(10000)
  })

});