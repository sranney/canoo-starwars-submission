///<reference types="cypress" />
export {}
describe('application e2e tests', () => {
    beforeEach(() => {
        localStorage.removeItem('film')
    })
    it('should show film detail when user clicks on a film within a vehicle card', () => {
        cy
            .visit('/') // load application
            .contains('Vehicle Name:') // find by displayed text the first vehicle list item
            .first() // get first vehicle
            .parent()
            .contains('Films:')
            .get('button') // find within the vehicle list item a film button
            .first()
            .click() // user wishes to view more detail about the movie
            .then(button => {
                // the button text is the title of the movie that the user clicked to view details about
                const buttonText = button.text()
                const storedValue = localStorage.getItem('film')
                // assert that the localStorage is getting updated with the most recent film that the user has chosen to view
                if(storedValue) {
                    expect(JSON.parse(storedValue).title).to.equal(buttonText)
                }
                cy
                    .visit('/') // the film that the user has chosen should persist across page refresh
                    .contains('Film Detail:')
                    .parent()
                    .contains('Title')
                    .should('include.text', buttonText) // validate that the movie details shown are for the movie which the user clicked to view
                    
            })
    })

    it('should allow user to page through vehicle results', () => {
        cy
            .visit('/')
            .then(_ => {
                cy.intercept('GET', 'https://swapi.py4e.com/api/vehicles/?page=2').as('NextPage') // listen for outgoing get requests for next page information (aliased as NextPage)
                cy.intercept('GET', 'https://swapi.py4e.com/api/vehicles/?page=1').as('PreviousPage') // listen for outgoing get requests for previous page information (aliased as PreviousPage)
                cy.contains('nav button', /previous/i).should('be.disabled')
                cy.contains('nav button', /next/i).should('exist').then(nextBtn => {
                    cy.wrap(nextBtn).click()

                    cy
                    .contains('li div', 'Vehicle Name:') // find by displayed text the first vehicle list item
                    .first()
                    .then(vehicle => {
                        const vehicleNameText = vehicle.text()
                        cy.wrap(vehicleNameText).as('firstVehicleName') // storing the original first vehicle name in a cypress variable
                    }) 
                    // wait till cypress intercepts the response from request aliased with @NextPage
                    cy.wait('@NextPage')
                    cy.get('@NextPage').its('response.statusCode').should('equal', 200)
                    cy.get('@NextPage').its('response.url').should('contain', 'page=2')
                    // requerying first vehicle name
                    cy.contains('li div', 'Vehicle Name:').first().then(vehicle => {
                        const vehicleNameText = vehicle.text()
                        cy.get('@firstVehicleName').then(firstVehicleName => {
                            // now that we are on a different page of vehicle data, we do not expect to have the first vehicle on the new page equal the first vehicle on the first page
                            expect(vehicleNameText).to.not.equal(firstVehicleName)
                        })
                    })
                    cy.contains('nav button', /previous/i).should('exist').then(prevBtn => {
                        cy.wrap(prevBtn).click()
                        // wait till cypress intercepts the response from request aliased with @PreviousPage
                        cy.wait('@PreviousPage')
                        cy.get('@PreviousPage').then((prevPageResponse) => {
                            expect(prevPageResponse).property('response').property('statusCode').to.equal(200)
                            expect(prevPageResponse).property('response').property('url').to.contain('page=1')
                            cy.contains('li div', 'Vehicle Name:').first().then(vehicle => {
                                const vehicleNameText = vehicle.text()
                                cy.get('@firstVehicleName').then(firstVehicleName => {
                                    // now that we are on the original page of vehicle data, we do expect to have the first vehicle on the new page equal the first vehicle on the first page
                                    expect(vehicleNameText).to.equal(firstVehicleName)
                                })
                            })
                        })
                    })
                })
            })
    })

    it('should allow user to search the API for specific vehicles by name and model of vehicle', () => {
        cy.visit('/')
            .get('[aria-label="vehicle search input"]')
            .then(input => {
                const searchTerm = 'sand'
                cy.intercept('GET', `https://swapi.py4e.com/api/vehicles/?search=${searchTerm}`).as('SearchResponse')
                cy.wrap(input).type(searchTerm)
                cy.wait('@SearchResponse')
                // find all vehicle list items
                // and find the two fields within each item which the search results could have matched against: name and model
                cy.contains('div', 'Vehicle Name:').each(vehicleNameElement => {
                    cy.wrap(vehicleNameElement).parent().contains('div', 'Model:').then(modelElement => {
                        const vehicleNameText = vehicleNameElement.text()
                        const vehicleNameContainsSearchTerm = vehicleNameText.toLowerCase().includes(searchTerm)
                        const modelText = modelElement.text()
                        const vehicleModelContainsSearchTerm = modelText.toLowerCase().includes(searchTerm)
                        // either the name or the model should contain the search term
                        const searchTermResultValid = vehicleNameContainsSearchTerm || vehicleModelContainsSearchTerm
                        expect(searchTermResultValid).to.be.true
                    })
                })
            })
    })
    it('should present user with an error message if fetching vehicles results in an error', () => {
        /**
         * unfortunately, I'm not sure how to test that this is actually something I could receive from this endpoint
         * without contacting the team behind the API. Additionally, swapi.dev seems to be up again.
         * But I think it is important to present the user an error in the case of a data fetch error, so I've built this anyways.
         */
        cy.intercept(
            'GET',
            'https://swapi.py4e.com/api/vehicles/',
            { forceNetworkError: true }
        )
        cy.visit('/')
        cy.contains('An error has occurred.').should('exist') // we should be seeing the error content now
        cy.contains('Failed to fetch').should('exist') // we should present user with additional information about the error including the error message
    })
})