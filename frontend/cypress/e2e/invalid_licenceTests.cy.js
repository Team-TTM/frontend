describe('Validation du numéro de licence', () => {
  it("affiche un message d'erreur si le numéro de licence est invalide", () => {
    cy.visit('http://localhost:5173/signup');
    // Saisir un numéro de licence invalide
    cy.get('.licence-input').type('ABCD12345'); // Numéro invalide
    // Cliquer sur le bouton "Valider"
    cy.get('.licence-validate-button').click();
    // Vérifier que le message d'erreur s'affiche
    cy.get('.error-message').should('be.visible').and('contain', 'Numéro de licence invalide');
  });
});
