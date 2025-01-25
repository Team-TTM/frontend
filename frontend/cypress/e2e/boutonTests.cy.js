describe('Retour Bouton Navigation Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('doit naviguer de la page "Connected" vers la page précédente quand  "Retour" est clické', ()=>{
    cy.visit('http://localhost:5173/connected');
    cy.get('button#retour-connected').click();
    cy.url().should('eq', 'http://localhost:5173/signup');
  });

  it('doit naviguer de la page "Signup" vers la page précédente quand  "Retour" est clické', ()=>{
    cy.visit('http://localhost:5173/signup');
    cy.get('button#retour-signup').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('doit naviguer de la page "/" vers la page "Signup" quand  "S\'inscrire" est clické', ()=>{
    cy.visit('http://localhost:5173');
    cy.get('button#inscription').click();
    cy.url().should('eq', 'http://localhost:5173/signup');
  });

  it('doit naviguer de la page "Signup" vers la page "Connected" quand  "Valider" est clické', ()=>{
    cy.visit('http://localhost:5173/signup');
    cy.get('button#validate').click();
    cy.url().should('eq', 'http://localhost:5173/connected');
  });
});
