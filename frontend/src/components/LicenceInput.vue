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
export default {
  data() {
    return {
      licenceValue: '', // Stocke la valeur saisie par l'utilisateur
      errorMessage: '', // Message d'erreur à afficher
    };
  },
  methods: {
    validateLicence() {
      const licenceRegex = /^[ABC]\d{5}[CL]\d{7}[A-Z]{2}[A-Z\d]FRA$/;

      if (!licenceRegex.test(this.licenceValue.trim())) {
        this.errorMessage = 'Numéro de licence invalide.';
      } else {
        this.errorMessage = ''; // Réinitialise le message d'erreur si la saisie est valide
        this.$router.push('/connected');
      }
    },
  },
};
</script>

<style scoped>

.licence-validate-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
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
  color: red;
  margin-top: 5px;
  font-size: 14px;
}
</style>
