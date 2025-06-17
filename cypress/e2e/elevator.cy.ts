describe('Elevator System', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/', {
      failOnStatusCode: false,
      timeout: 30000,
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog')
        cy.stub(win.console, 'error').as('consoleError')
      }
    })
  })

  it('should initialize with 4 elevators', () => {
    cy.get('[data-test="elevator"]').should('have.length', 4)
  })

  it('should show correct floor display for each elevator', () => {
    cy.get('[data-test="elevator"]').each(($elevator) => {
      cy.wrap($elevator).within(() => {
        cy.get('[data-test="floor-display"]').should('have.length', 10)
      })
    })
  })

  it('should show elevator status information', () => {
    cy.get('[data-test="elevator"]').first().within(() => {
      cy.get('[data-test="current-floor"]').should('exist')
      cy.get('[data-test="direction"]').should('exist')
    })
  })

  it('should show passenger information', () => {
    cy.get('[data-test="elevator"]').first().within(() => {
      cy.get('[data-test="passenger-info"]').should('exist')
    })
  })

  it('should show elevator logs', () => {
    cy.get('[data-test="elevator"]').first().within(() => {
      cy.get('[data-test="elevator-logs"]').should('exist')
    })
  })

  it('should handle floor requests', () => {
    // Wait for initial state
    cy.wait(1000)

    // Check if floor requests are being generated
    cy.get('[data-test="floor-display"]').should(($floors) => {
      const hasRequests = $floors.find('[data-test="up-request"], [data-test="down-request"]').length > 0
      expect(hasRequests).to.be.true
    })
  })

  it('should show elevator movement', () => {
    // Wait for initial state
    cy.wait(1000)

    // Get initial floor
    cy.get('[data-test="elevator"]').first().within(() => {
      cy.get('[data-test="current-floor"]').invoke('text').then((initialFloor) => {
        // Wait for movement
        cy.wait(10000)
        
        // Check if floor has changed
        cy.get('[data-test="current-floor"]').invoke('text').should('not.equal', initialFloor)
      })
    })
  })
}) 