describe('Retour Bouton Navigation Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it("doit naviguer de la page Signup vers la page Connected quand  Valider est clické si le numéro de licence est bon", () => {
    cy.visit('http://localhost:3000/users/signup');
    // Saisir un numéro de licence invalide
    cy.get('.licence-input').type('C00808C0180418FV3FRA'); // Numéro valide
    // Cliquer sur le bouton "Valider"
    cy.get('.licence-validate-button').click();
    // Vérifier que le message d'erreur s'affiche
    cy.url().should('eq','http://localhost:3000/users/connected') ;
  });
});
