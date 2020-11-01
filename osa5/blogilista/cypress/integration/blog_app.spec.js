describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Tuomo',
            username: 'Tuppu',
            password: 'salasana'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Blogs')
    })
    it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.get('form').contains('username')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.visit('http://localhost:3000')
            cy.get('#username').type('Tuppu')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
            cy.contains('Logged in as Tuomo')
        })
        it('fails with wrong credentials', function() {
            cy.visit('http://localhost:3000')
            cy.get('#username').type('Tuppu')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.contains('wrong username or password')
            cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username: 'Tuppu', password: 'salasana'
            }).then(response => {
                localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('a blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('.titleinput').type('Cypress Title')
            cy.get('.authorinput').type('Cypress Author')
            cy.get('.urlinput').type('https://docs.cypress.io')
            cy.contains('save').click()
            cy.get('.bloglist').contains('Cypress Title')
        })

        it('a blog can be liked', function() {
            cy.contains('new blog').click()
            cy.get('.titleinput').type('Likeable Title')
            cy.get('.authorinput').type('Likeable Author')
            cy.get('.urlinput').type('https://docs.likeme.io')
            cy.contains('save').click()
            cy.contains('view').click()
            cy.contains('Likes 0')
            cy.contains('like').click()
            cy.contains('Likes 1')
        })

        it('a blog can be deleted', function() {
            cy.contains('new blog').click()
            cy.get('.titleinput').type('Deletable Title')
            cy.get('.authorinput').type('Deletable Author')
            cy.get('.urlinput').type('https://docs.cypress.io')
            cy.contains('save').click()
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.get('.bloglist').get('Deletable Title').should('not.exist')
        })

        it.only('blogs are ordered by likes', function() {
            cy.contains('new blog').click()
            cy.get('.titleinput').type('Cypress Title 1')
            cy.get('.authorinput').type('Cypress Author')
            cy.get('.urlinput').type('https://docs.cypress.io')
            cy.contains('save').click()

            cy.contains('new blog').click()
            cy.get('.titleinput').type('Cypress Title 2')
            cy.get('.authorinput').type('Cypress Author 2')
            cy.get('.urlinput').type('https://docs.cypress.io')
            cy.contains('save').click()

            cy.contains('new blog').click()
            cy.get('.titleinput').type('Cypress Title 3')
            cy.get('.authorinput').type('Cypress Author 3')
            cy.get('.urlinput').type('https://docs.cypress.io')
            cy.contains('save').click()

            
            cy.get('.bloglist').get('ul').find('div').eq(0).contains('view').click()
            cy.contains('like').click()
            cy.contains('Likes 1')
            cy.contains('like').click()
            cy.contains('Likes 2')
            cy.contains('hide').click()

            cy.get('.bloglist').get('ul').find('div').eq(1).contains('view').click()
            cy.contains('like').click()
            cy.contains('Likes 1')
            cy.contains('hide').click()

            cy.get('.bloglist').get('ul').find('div').eq(2).contains('view').click()
            cy.contains('like').click()
            cy.contains('Likes 1')
            cy.contains('like').click()
            cy.contains('Likes 2')
            cy.contains('like').click()
            cy.contains('Likes 3')
            cy.contains('hide').click()

            // Title 3 was voted three times and Title 1 two times. Check that they're first
            cy.get('.bloglist').get('ul').find('div').eq(0).contains('Cypress Title 3')
            cy.get('.bloglist').get('ul').find('div').eq(1).contains('Cypress Title 1')

            
        })
    })
})