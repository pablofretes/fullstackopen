describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'testingCypress',
      name: 'cypressCool',
      password: 'testingCy'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login').click()
    cy.get('[data-cy=username]').type('testingCypress')
    cy.get('[data-cy=password]').type('testingCy')
    cy.get('[data-cy=cancel-button]').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('[data-cy=username]').type('testingCypress')
      cy.get('[data-cy=password]').type('testingCy')
      cy.get('[data-cy=login-button]').click()
      cy.get('h1').should('contain', 'logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('[data-cy=username]').type('incorrectUsername')
      cy.get('[data-cy=password]').type('incorrectPassword')
      cy.get('[data-cy=login-button]').click()
      cy.get('[data-cy=error-message]').should('contain', 'Username or Password are incorrect')
    })
  })

  describe('Blog', function() {
    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('Login').click()
        cy.get('[data-cy=username]').type('testingCypress')
        cy.get('[data-cy=password]').type('testingCy')
        cy.get('[data-cy=login-button]').click()
      })

      it('A blog can be created', function() {
        cy.contains('Create new Blog').click()
        cy.get('[data-cy=title]').type('this is a cypress blog title')
        cy.get('[data-cy=author]').type('this is a cypress blog author')
        cy.get('[data-cy=url]').type('this is a cypress blog url')
        cy.get('[data-cy=create-button]').click()
        cy.get('[data-cy=error-message]').should('contain', 'A new Blog has been created')
        cy.get('[data-cy=blogs]').should('contain', 'this is a cypress blog title')
      })
    })
  })

  describe('Verifies if buttons like and delete work', function(){
    beforeEach(function(){
      cy.contains('Login').click()
      cy.get('[data-cy=username]').type('testingCypress')
      cy.get('[data-cy=password]').type('testingCy')
      cy.get('[data-cy=login-button]').click()
      cy.contains('Create new Blog').click()
      cy.get('[data-cy=title]').type('this is a cypress blog title')
      cy.get('[data-cy=author]').type('this is a cypress blog author')
      cy.get('[data-cy=url]').type('this is a cypress blog url')
      cy.get('[data-cy=create-button]').click()
      cy.get('[data-cy=error-message]').should('contain', 'A new Blog has been created')
      cy.get('[data-cy=blogs]').should('contain', 'this is a cypress blog title')
    })
    it('A blog can be liked', function(){
      cy.contains('view').click()
      cy.get('[data-cy=like-button]').click()
      cy.get('[data-cy=like-container]').should('contain', '1')
    })
    it('A blog can be deleted', function(){
      cy.contains('view').click()
      cy.get('[data-cy=delete-button]').click()
      cy.get('[data-cy=blogs]').not('contain', 'this is a cypress blog title')
    })
  })

  describe('testing function that sorts by likes', function(){
    beforeEach(function(){
      cy.contains('Login').click()
      cy.get('[data-cy=username]').type('testingCypress')
      cy.get('[data-cy=password]').type('testingCy')
      cy.get('[data-cy=login-button]').click()
    })

    it('tests order', function(){
      cy.contains('Create new Blog').click()
      cy.get('[data-cy=title]').type('testing feature')
      cy.get('[data-cy=author]').type('test likes author')
      cy.get('[data-cy=url]').type('test likes url')
      cy.get('[data-cy=create-button]').click()
      cy.get('[data-cy=title]').type('more likes test likes')
      cy.get('[data-cy=author]').type('more likes test likes author')
      cy.get('[data-cy=url]').type('more likes test likes url')
      cy.get('[data-cy=create-button]').click()
      cy.get('.visibility-button').eq(0).click()
      cy.contains('view').click()
      cy.get('.like-button').eq(1).click({ multiple: true })
      cy.get('[data-cy=show-likes]').should('contain', 'more likes test likes').should('contain', '1')
    })
  })
})