describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user={
      name:'kalle',
      username:'kalle22',
      password:'kalle2312'
    }
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')

  })
})
describe('Login',function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user={
      name:'kalle',
      username:'kalle22',
      password:'kalle2312'
    }
    cy.visit('http://localhost:3000')
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })
  it('succeeds with correct credentials', function() {
    cy.contains('login')
    cy.get('input:first').type('kalle22')
    cy.get('input:last').type('kalle2312')
    cy.get('button:last').click()
    cy.contains('logged in')})
  it('fails with wrong credentials', function() {
    cy.get('input:first').type('aakallse')
    cy.get('input:last').type('kalle2a312')
    cy.get('button:last').click()
    cy.contains('logged in')
  })})