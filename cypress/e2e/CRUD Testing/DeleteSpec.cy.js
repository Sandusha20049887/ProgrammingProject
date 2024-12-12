describe('Delete Post Flow', () => {
    it('should log in, navigate to user post page, and click to delete post', () => {
        // Log in to the application
        cy.visit('https://programming-project-nu.vercel.app/login.html');
        cy.get('#email').type('test@dbs.ie');
        cy.get('#password').type('test');
        cy.get('#login').click();

        // Go to user post page
        cy.url().should('include', '/index');
        cy.get('#userPost').click();

        // click delete button (select top 1 record)
        cy.url().should('include', '/userPost');

        cy.get('.list-group-item').first().within(() => { 
            cy.get('.deletePost').click();
        });
    });
});