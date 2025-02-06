<template>
  <main class="signup-content">
    <div class="logo">
      <LogoTTM/>
    </div>
    <div class="form-container">
      <LicenceInput/>
    </div>

    <router-link to="/">
      <button class="btn full-page-button retour-signup" id="retour-signup">Retour</button>
    </router-link>
  </main>
</template>


<script setup>
import LogoTTM from "@/components/icons/LogoTTM.vue";
import LicenceInput from '@/components/LicenceInput.vue';

</script>

<style scoped>
/* Styles spécifiques à la page S'inscrire */
.signup-content {
  width: 100%;
  max-width: 400px; /* Largeur maximale du conteneur */
  height: 100vh; /* Hauteur de la fenêtre */
  margin: 0 auto; /* Centrer horizontalement */
  display: grid;
  flex-direction: column;
  align-items: center; /* Aligner les éléments au centre horizontalement */
  justify-content: center; /* Aligner les éléments au centre verticalement */
  gap: 20px; /* Espacement uniforme entre les éléments */
  text-align: center;
}

/* Conteneur pour l'input et le bouton */
.form-container {
  position: absolute;
  top:33%;
  left:39%;
  padding: 20px; /* Espacement interne */
  background-color: #f2f2f2; /* Fond gris clair */
  border-radius: 10px; /* Coins arrondis */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ombre légère */
  display: flex;
  flex-direction: column; /* Disposition verticale des éléments */
  align-items: center; /* Centrer horizontalement */
  gap: 15px; /* Espacement entre les éléments */
  margin: 20px auto; /* Centrer le conteneur sur la page */
}

.logo{
  position: absolute;
  top: 8%;
  left:12%;
  width: 200px;
}

h1 {
  position: absolute;
  top: 25%;
  left:42.5%;
  margin: 1rem 0;
  color: red;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
}

.full-page-button {
  width: 100%;
  max-width: 300px;
  margin: 15px 0;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2rem;
}

.retour-signup {
  width: 100px;
  position: absolute;
  bottom: 5%;
  right: 10%;
  transform: translate(-50%, -50%);
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
}

.retour-signup:hover{
  background-color: #cb4335;
}

</style>
