<template>
  <div class="input-container">
    <input
      class="full-page-input licence-input"
      placeholder="Votre numéro de licence"
      v-model="licenceValue"
      @keydown.enter="validateLicence"
    />
    <p  v-if="errorMessage" class="error-message" >
      {{ errorMessage }}
    </p>
    <p v-if="goodMessage" class="good-message" style="font-size:15px;">
      {{ goodMessage }}
    </p>
    <button class="licence-validate-button full-page-button" @click="validateLicence">Valider</button>
  </div>
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
            setTimeout(() => this.$router.push('/connected'), 2000);
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

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width : 400px;
  height: 200px;
  margin: 20px 0;
}

p{
  position : absolute;
  top : 10%;
  font-size : 20px;
}

.licence-input {
  position : absolute;
  top : 30%;
  border-radius: 5px; /* Coins arrondis */
  border: 1px solid #ccc; /* Bordure légère */
}

.licence-validate-button {
  position : absolute;
  top : 70%;
  left : 33%;
  width : 150px;
  height : 40px;
  background-color: #17a589;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s;
}

.licence-validate-button:hover {
  background-color: #148f77;
}

.full-page-input {
  position: absolute;
  width: 250px;
  max-width: 300px;
  margin: 15px 0;
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
}

.error-message {
  color: #ee261d;
  margin-top: 5px;
  font-size: 14px;
}

.good-message{
  color : #17a589;
  margin-top:5px;
  font-size:14px;
}
</style>
