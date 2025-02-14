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
        const response = await axios.post("http://localhost:3000/users/licence-check", body, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          validateStatus: (status) => true // Accepter tous les statuts HTTP
        });

        console.log("Réponse serveur :", response);

        switch (response.status) {
          case 404:
            this.errorMessage = `Licence ${this.licenceValue} introuvable.`;
            break;
          case 403:
            this.errorMessage = "Utilisateur non trouvé.";
            break;
          case 402:
            this.errorMessage = "Fusion impossible : deux comptes du même type (Facebook ou Google) détectés.";
            break;
          case 401:
            this.errorMessage = "Utilisateur non authentifié.";
            break;
          case 400:
            this.errorMessage = "Le paramètre 'licence' est requis.";
            break;
          case 501:
            this.errorMessage = "Erreur lors de la redirection après authentification.";
            break;
          case 500:
            this.errorMessage = "Une erreur s'est produite lors de l'authentification de la licence.";
            break;
          case 201:
            this.goodMessage = "Fusion des comptes réussie (Facebook et Google).";
            setTimeout(() => this.$router.push('/connected'), 2000);
            break;
          case 200:
            this.goodMessage = `Licence ${this.licenceValue} associée à l'utilisateur avec succès.`;
            setTimeout(() => this.$router.push('/users/connected'), 2000);
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
