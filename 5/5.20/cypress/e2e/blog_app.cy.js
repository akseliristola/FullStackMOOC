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
    cy.contains('log in the application')
  })})

describe('creating blogs',function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user={
      name:'kalle',
      username:'kalle22',
      password:'kalle2312' }
    cy.visit('http://localhost:3000')
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
    cy.contains('log in')
    cy.get('input:first').type('kalle22')
    cy.get('input:last').type('kalle2312')
    cy.get('button:last').click()
    cy.contains('logged in')})
  it('A blog can be created', function() {
    cy.contains('kalle logged in')
    cy.get('button:last').click()
    cy.get('.titleclass').type('kallen blogi')
    cy.get('.authorclass').type('kalle')
    cy.get('.urlclass').type('1234')
    cy.get('.formbutton').click()
  })

})
describe('liking blogs',function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user={
      name:'kalle',
      username:'kalle22',
      password:'kalle2312' }
    cy.visit('http://localhost:3000')
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
    cy.contains('log in')
    cy.get('input:first').type('kalle22')
    cy.get('input:last').type('kalle2312')
    cy.get('button:last').click()
    cy.contains('logged in')})
  it('A blog can be liked', function() {
    cy.contains('kalle logged in')
    cy.get('button:last').click()
    cy.get('.titleclass').type('kallen blogi')
    cy.get('.authorclass').type('kalle')
    cy.get('.urlclass').type('1234')
    cy.get('.formbutton').click()
    cy.get('.viewbutton').click()
    cy.contains('like').click()
    cy.contains('1')
  })})