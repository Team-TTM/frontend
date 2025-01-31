<template>
  <div>
    <!-- Optionnel : Message de chargement -->
    <p>Chargement...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clientId: "YOUR_GOOGLE_CLIENT_ID",  // Remplace par ton vrai Client ID Google
    };
  },
  mounted() {
    // Vérifie si le script Google est déjà chargé
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse, // Callback pour récupérer le token
      });

      // Demande l'authentification de l'utilisateur
      window.google.accounts.id.prompt();
    }
  },
  methods: {
    handleCredentialResponse(response) {
      // Récupère le token ID (token d'authentification)
      const idToken = response.credential;
      console.log("Token ID récupéré:", idToken);

      // Envoie le token au backend pour validation
      this.sendTokenToBackend(idToken);
    },

    async sendTokenToBackend(idToken) {
      try {
        const response = await this.$axios.post('http://localhost:3000/users/google/callback', {
          token: idToken,  // Envoie le token au backend
        });

        console.log("Réponse du backend:", response.data);

        // Une fois le backend validé, tu peux rediriger ou faire autre chose
        this.$router.push('/dashboard'); // Exemple de redirection vers le dashboard
      } catch (error) {
        console.error("Erreur d'envoi du token au backend:", error);
        // Gérer les erreurs comme afficher un message d'erreur
        this.$router.push('/error'); // Exemple de redirection vers une page d'erreur
      }
    },
  },
};
</script>

<style scoped>
/* Ajoute ton style pour ce composant si nécessaire */
</style>
