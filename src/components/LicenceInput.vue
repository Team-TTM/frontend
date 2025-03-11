<template>
  <p  v-if="errorMessage" class="error-message" style="font-size:15px;">
    {{ errorMessage }}
  </p>
  <p v-if="goodMessage" class="good-message" style="font-size:15px;">
    {{ goodMessage }}
  </p>
  <input
    class="licence-input"
    placeholder="Numéro de licence"
    v-model="licenceValue"
    @keydown.enter="validateLicence"
  />
  <button class="licence-validate-button" @click="validateLicence">Valider</button>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      licenceValue: '',
      errorMessage: '',
      goodMessage: '',
    };
  },
  methods: {
    async validateLicence() {
      const uri =  "/users/licence-check";

      // Réinitialiser les messages avant la requête
      this.errorMessage = '';
      this.goodMessage = '';

      if (!this.licenceValue.trim()) {
        this.errorMessage = 'Numéro de licence invalide.';
        return;
      }

      try {
        const token = this.$store.getters['getToken'];
        console.log(token);
        const body = { licence: this.licenceValue };

        // Ajout de validateStatus pour empêcher Axios de lever une erreur
        const response = await axios.post(uri, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          validateStatus: (status) => true // Accepter tous les statuts HTTP
        });

        console.log("Réponse serveur :", response);

        switch (response.status) {
          case 400:
            this.errorMessage = response.data.error;
            break;
          case 200:
            this.goodMessage = response.data.message;
            this.$router.push('/users/csvListeAdherent');
            break;
          default:
            this.errorMessage = "Une erreur inconnue est survenue.";
            break;
        }
      } catch (error) {
        console.error("Erreur lors de la requête :", error);

        // Vérification pour éviter les erreurs d'accès aux données
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data?.message || "Une erreur est survenue.";
          this.errorMessage = `Erreur ${status}: ${message}`;
        } else {
          this.errorMessage = "Erreur réseau : impossible de contacter le serveur.";
        }
      }
    },
  },
  mounted() {
    const token = this.$route.query.token;
    if (token) {
      this.$store.dispatch("login", token);
      console.log("Token stocké :", this.$store.getters.isAuthenticated, this.$store.getters.getToken);
    }
  }
};
</script>

<style scoped>

</style>
