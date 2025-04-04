<template>
  <p  v-if="errorMessage" class="error-message" style="font-size:15px;">
    {{ errorMessage }}
  </p>
  <p v-if="goodMessage" class="good-message" style="font-size:15px;">f
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
import {useMessage} from 'naive-ui';

export default {
  data() {
    return {
      licenceValue: '',
      errorMessage: '',
      goodMessage: '',
      message: useMessage(),
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
          validateStatus: () => true // Accepter tous les statuts HTTP
        });

        console.log("Réponse serveur :", response);

        switch (response.status) {
          case 400:
            this.errorMessage = response.data.error;
            this.message.error(response.data.error);
            break;
          case 200:
            this.goodMessage = response.data.message;
            this.$store.commit('setRole', response.data.role);
            this.$store.commit('login', response.data.token);
            this.$router.push('/users/csvListeAdherent');
            this.message.success(response.data.message);
            break;
          default:
            this.errorMessage = "Une erreur inconnue est survenue.";
            this.message.error('Une erreur inconnue est survenue.');
            break;
        }
      } catch (err) {
        if (err.response) {
          this.message.error(err.response?.data.error || 'Une erreur est survenue.');
        } else if (err.request) {
          this.message.error('Problème de connexion. Veuillez réessayer plus tard.');
        } else {
          this.message.error('Une erreur inconnue est survenue.');
        }
      }
    },
  },
  mounted() {
    const token = this.$route.query.token;
    this.$router.replace({path: this.$route.path});
    if (token) {
      this.$store.dispatch("login", token);
    }
  }
};
</script>

<style scoped>

</style>
