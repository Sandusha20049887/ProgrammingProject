describe('Create Post Flow', () => {
    it('should log in, navigate to create page, and create a post', () => {
        // Log in to the application
        cy.visit('https://programming-project-nu.vercel.app/login.html');
        cy.get('#email').type('test@dbs.ie');
        cy.get('#password').type('test');
        cy.get('#login').click();

        // Go to post create page
        cy.url().should('include', '/index');
        cy.get('#newPost').click();

      
    });
});
