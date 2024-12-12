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

        // Fill details and Create a Post
        cy.url().should('include', '/addUpdatePost');
        cy.get('#make').type('Toyota'); 
        cy.get('#model').type('Camry'); 
        cy.get('#year').type('2020'); 
        cy.get('#faultDescription').type('Engine not starting'); 
        cy.get('#garageName').type('Super Garage'); 
        cy.get('#garageAddress').type('1234 Elm St'); 
        cy.get('#contactNo').type('5855234'); 
        cy.get('#status').select('progressing');

        cy.on('window:alert', (str) => { 
             expect(str).to.equal('Post added!'); 
        });

        cy.get('#addPost').click();

        // Verify created post
        cy.url().should('include', '/index');
        cy.get('.post-box').last().within(() => {
            cy.get('h5').should('contain', 'Toyota Camry');      
            cy.get('.status').should('contain', 'progressing');     
            cy.contains('Year of manufacture : 2020');            
        });
    });
});
