

describe("Http Requests", () => {
    // Get Posts 
    it("GET Posts call", () => {
        cy.request('GET', 'https://smarlk.uksouth.cloudapp.azure.com/getPost')
            .its('status')
            .should('equal', 200);
    })

    // Register
    it("Post Register call", () => {
        cy.request({
            method: 'POST',
            url: 'https://smarlk.uksouth.cloudapp.azure.com/register',
            body: {
                name: "Test user",
                password: "test1",
                email: "test1@dbs.ie"
            }
        })
    })

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
            expect(response.body).to.have.property('userId,usern');
            expect(response.body.user).to.have.property('usern', 'test@dbs.ie');
        })
        .its('status')
        .should('equal', 200)
    })
})
