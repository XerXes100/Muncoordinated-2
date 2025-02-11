import { purge, SANDBOX, invokeModalAndLogin } from './utils'

const SELECT_MEMBER = '.adder__dropdown--select-member'
const SELECT_RANK = '.adder__dropdown--select-rank'
const TOGGLE_PRESENT = '.adder__checkbox--toggle-present'
const TOGGLE_VOTING = '.adder__checkbox--toggle-voting'
const ADD_MEMBER = '.adder__button--add-member'
const REMOVE_MEMBER = ".members__button--remove-member"

function clickAddMember() {
  cy.get(ADD_MEMBER).click()
  cy.get(ADD_MEMBER).should('be.disabled')
  cy.get(SELECT_MEMBER).should('have.class', 'error')
}

describe('Add members and checks that the thresholds are sensible', function () {
    before(function() {
      purge()
      cy.visit(SANDBOX)
    })

    it('logs in to our test account', () => {
      invokeModalAndLogin()
    })

    it('navs to the admin page', () => {
      cy.contains('Setup').click()
      cy.url().should('include', '/setup')
      cy.wait(2000)
    })

    it('removes all pre-existing members', function () {
      cy.get(REMOVE_MEMBER).click({ multiple: true })
    })

    it('adds Afghanistan', function () {
      clickAddMember()
      cy.get('table').should('contain', 'Afghanistan')
    })

    it('adds Bolivia', function () {
      cy.get(SELECT_MEMBER).children('input').click().type('Bolivia{enter}')
      cy.get(SELECT_RANK).children('input').click().type('Observer{enter}')

      clickAddMember()

      cy.get('table').should('contain', 'Bolivia')
    })

    it('adds China', function () {
      cy.get(SELECT_MEMBER).children('input').click().type('China{enter}')
      cy.get(SELECT_RANK).children('input').click().type('Veto{enter}')
      cy.get(TOGGLE_VOTING).children('input').check({force: true})

      clickAddMember()

      cy.get('table').should('contain', 'China')
    })

    it('goes to the Thresholds page', function () {
      cy.get('table').contains('Total').siblings().should('contain', '3')
      cy.get('table').contains('Present').siblings().should('contain', '3')
      cy.get('table').contains('Have voting rights').siblings().should('contain', '2')
      cy.get('table').contains('Debate').siblings().should('contain', '1')
      cy.get('table').contains('Procedural threshold').siblings().should('contain', '2')
      cy.get('table').contains('Operative threshold').siblings().should('contain', '1')
      cy.get('table').contains('Draft resolution').siblings().should('contain', '1')
      cy.get('table').contains('Amendment').siblings().should('contain', '1')
    })
  })
