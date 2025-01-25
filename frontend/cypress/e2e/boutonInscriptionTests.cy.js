describe('Bouton S\'inscrire Navigation Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('doit naviguer de la page "/" vers la page "Signup" quand  "S\'inscrire" est clické', () => {
    cy.get('button#inscription').click();
    cy.url().should('eq', 'http://localhost:5173/signup');
  });
});
