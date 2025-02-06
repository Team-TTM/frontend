<template>
  <div class="input-container">
    <input
      class="full-page-input licence-input"
      placeholder="Votre numéro de licence"
      v-model="licenceValue"
      @keydown.enter="validateLicence"
    />
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
    <button class="licence-validate-button full-page-button" @click="validateLicence">Valider</button>
  </div>
</template>

<script>

import axios from "axios";

export default {

  data() {
    return {
      licenceValue: '', // Stocke la valeur saisie par l'utilisateur
      errorMessage: '', // Message d'erreur à afficher
    };
  },
  methods: {
    async validateLicence() {
      if (this.licenceValue.length === 0) {
        this.errorMessage = 'Numéro de licence invalide.';
      } else {
        const token = this.$store.getters['getToken'];
        console.log(token);
        const body = {
          licence: this.licenceValue,
        }
        const response = await axios.post("http://localhost:3000/users/licence-check",body,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        switch (response.status){
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
          case 201:
            this.errorMessage = "Fusion des comptes réussie (Facebook et Google).";
            break;
          case 200:
            this.errorMessage = `Licence ${this.licenceValue} associée à l'utilisateur avec succès.`;
            break;
          case 501:
            this.errorMessage = "Erreur lors de la redirection après authentification."
            break;
          case 500:
            this.errorMessage = "Une erreur s'est produite lors de l'authentification de la licence.";
            break;
          default:
            this.errorMessage = "Une erreur inconnue est survenue.";
            break;
        }
        console.log(response.data)
        this.errorMessage = ''; // Réinitialise le message d'erreur si la saisie est valide
        this.$router.push('/connected');
      }
    },
  },
  mounted() {
    const token = this.$route.query.token;
    if (token) {
      this.$store.dispatch("login", token);
      console.log("Token stocké :",this.$store.getters.isAuthenticated,this.$store.getters.getToken);
    }
  }
};
</script>

<style scoped>

.licence-validate-button {
  background-color: #ee261d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.licence-validate-button:hover {
  background-color: #c1150d;
}

.licence-input {
  border-radius: 5px; /* Coins arrondis */
  border: 1px solid #ccc; /* Bordure légère */
  cursor: pointer;
}

.full-page-button {
  width: 80px;
  max-width: 300px;
  margin: 15px 0;
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
}

.full-page-input {
  width: 250px;
  max-width: 300px;
  margin: 15px 0;
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
}



.input-container {
  margin: 20px 0;
}

.error-message {
  color: black;
  margin-top: 5px;
  font-size: 14px;
}
</style>
