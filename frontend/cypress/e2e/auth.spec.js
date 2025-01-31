describe('Authentification - Boutons Google', () => {
  beforeEach(() => {
    cy.visit('/'); // Remplacez par l'URL de votre page de connexion
  });

  it('Les boutons d\'authentification doivent être visibles', () => {
    cy.get('[data-cy=google-login]').should('be.visible');
  });

  it('Les boutons doivent être cliquables', () => {
    cy.get('[data-cy=google-login]').click();
  });

  it('Simuler une connexion Google', () => {
    cy.intercept('POST', '/api/auth/google', {
      statusCode: 200,
      body: { token: 'fake_google_token', user: { name: 'Test User', email: 'test@example.com' } }
    }).as('googleAuth');

    cy.get('[data-cy=google-login]').click();
    cy.wait('@googleAuth');

    // Vérifier que l'utilisateur est connecté (ex: affichage du nom)
    cy.contains('Test User').should('be.visible');
  });

  it('Redirige l\'utilisateur après authentification', () => {
    cy.intercept('POST', '/api/auth/google', {
      statusCode: 200,
      body: { token: 'fake_google_token', user: { name: 'Test User' } }
    });

    cy.get('[data-cy=google-login]').click();
    cy.url().should('include', '/users/signup');
  });

});
