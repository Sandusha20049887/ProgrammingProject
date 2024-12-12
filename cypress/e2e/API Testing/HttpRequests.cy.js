

describe("Http Requests", () => {
    // Get Posts 
    it("GET Posts call", () => {
        cy.request('GET', 'https://smarlk.uksouth.cloudapp.azure.com/getPost')
            .its('status')
            .should('equal', 200);
    });

    // Register
    it("POST Register call", () => {
        cy.request({
            method: 'POST',
            url: 'https://smarlk.uksouth.cloudapp.azure.com/register',
            body: {
                name: "Test user 2",
                password: "123",
                email: "test3@dbs.ie"
            }
        })
        .its('status')
        .should('equal', 200);
    });

    // Login 
    it("POST Login call", () => {
        cy.request({
            method: 'POST',
            url: 'https://smarlk.uksouth.cloudapp.azure.com/login',
            body: {
                password: "test",
                email: "test@dbs.ie"
            }
        })
        .then((response) => {
            // Check status code 
            expect(response.status).to.equal(200);
            cy.log(JSON.stringify(response.body));
            // Check response body values 
            //expect(JSON.stringify(response.body)[0].userId).to.equal('675a09e0e4bcb2f5fb01c828');
            //expect(JSON.stringify(response.body)[0].usern).to.equal('test');
        })
    });
})
