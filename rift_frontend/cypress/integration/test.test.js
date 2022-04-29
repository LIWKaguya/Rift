/* eslint-disable no-undef */

    it('Login form is shown', () => {
        cy.contains('login').click()
        cy.get('#username').type('username1')
        cy.get('#password').type('password1')
        cy.get('#login-button').click()

        cy.contains('username1 logged in')
    })
