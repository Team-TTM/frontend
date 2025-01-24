<template>
  <main class="signup-content">
    <div class="logo">
      <LogoTTM/>
    </div>
    <h1>INSCRIVEZ VOUS</h1>
    <button class="btn full-page-button licence-button">Numéro de Licence</button>
    <router-link to="/">
      <button class="btn full-page-button validate-button">Valider</button>
    </router-link>
  </main>
</template>

<script setup>
import LogoTTM from "@/components/icons/LogoTTM.vue";
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

.logo{
  position: absolute;
  top: 30%;
  left:50%;
}

h1 {
  position: absolute;
  top: 5%;
  left:42%;
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

.licence-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #4caf50;
  color: white;
  border: none;
}

.validate-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  transform: translate(-50%, -50%);
  background-color: #4caf50;
  color: white;
  border: none;
}
</style>
