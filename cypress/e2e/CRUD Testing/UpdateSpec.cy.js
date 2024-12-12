describe('Update Post Flow', () => {
    it('should log in, navigate to user post page, and navigate to update post', () => {
        // Log in to the application
        cy.visit('https://programming-project-nu.vercel.app/login.html');
        cy.get('#email').type('test@dbs.ie');
        cy.get('#password').type('test');
        cy.get('#login').click();

        // Go to user post page
        cy.url().should('include', '/index');
        cy.get('#userPost').click();

        // Go to update page (select top 1 record)
        cy.url().should('include', '/userPost');

        cy.get('.list-group-item').first().within(() => { 
            cy.get('.updatePost').click();
        });

        // Fill in only specific fields in Update Form 
        cy.url().should('include', '/addUpdatePost'); 
        cy.get('#ufaultDescription').clear().type('Battery issue'); 
        cy.get('#ugarageName').clear().type('Quality Garage'); 
        cy.get('#ugarageAddress').clear().type('7890 Maple St'); 
        cy.get('#ucontactNo').clear().type('555006789'); 
        cy.get('#ustatus').select('resolved');

        // verify alert text
        cy.on('window:alert', (str) => { 
            expect(str).to.equal('Post Updated!'); 
       });

       cy.get('#updatePost').click();

        // Verify updated post
        cy.url().should('include', '/userPost');
        cy.get('.list-group-item').first().within(() => {
            cy.contains('Fault Description : Battery issue'); 
            cy.contains('Garage Name : Quality Garage'); 
            cy.contains('Address : 7890 Maple St'); 
            cy.contains('Contact No : 555006789');           
        });
    })
});