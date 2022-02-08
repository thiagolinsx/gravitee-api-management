import { ADMIN_USER } from 'fixtures/fakers/users/users';

describe('Signout Feature', () => {
  it(`should visit apim console`, () => {
    cy.visit(`${Cypress.env('managementUI')}/#!/login`);
  });

  it(`should launch the login page`, () => {
    cy.url().should('contain', 'login');
  });

  it(`should be able to login`, () => {
    cy.wait(4000);
    cy.get('#input_0').type(ADMIN_USER.username);
    cy.get('#input_1').type(ADMIN_USER.password);
    cy.get('.btn').click();
    cy.wait(4000);
    cy.contains('Home board');
  });

  it(`should have the account menu`, () => {
    cy.get('[aria-label="Open user menu"]').click();
  });

  it(`should have account menu elements`, () => {
    cy.get('.gv-menu-content').should('be.visible');
    cy.get('a[ui-sref="user"]').contains('My account');
    cy.get('a[ui-sref="management.tasks"]').contains('Tasks');
    cy.get('a[ui-sref="management.support.create"]').contains('Support');
    cy.get('a[ui-sref="user"]').contains('My account');
    cy.get('a[ui-sref="logout"]').should('be.visible');
  });

  it(`should be able to logout`, () => {
    cy.get('a[ui-sref="logout"]').click();
    cy.contains('Sign In');
 });
});