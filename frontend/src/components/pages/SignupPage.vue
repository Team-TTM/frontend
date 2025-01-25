<template>
  <main class="signup-content">
    <div class="logo">
      <LogoTTM />
    </div>
    <h1>INSCRIVEZ VOUS</h1>

    <div class="form-container">
      <input class="full-page-input licence-input" placeholder="Votre numéro de licence">
      <router-link to="/connected">
        <button class="btn full-page-button licence-validate-button">Valider</button>
      </router-link>
    </div>

    <router-link to="/">
      <button class="btn full-page-button goback-button">Retour</button>
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

/* Conteneur pour l'input et le bouton */
.form-container {
  position: absolute;
  bottom:30%;
  left:39%;
  width: 100%; /* Occupe toute la largeur */
  max-width: 350px; /* Largeur maximale */
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

.full-page-input {
  width: 100%;
  max-width: 300px;
  margin: 15px 0;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2rem;
}

.licence-input {
  width: 100%; /* Input occupe toute la largeur du conteneur */
  padding: 10px; /* Espacement interne de l'input */
  border-radius: 5px; /* Coins arrondis */
  border: 1px solid #ccc; /* Bordure légère */
  font-size: 1rem; /* Taille du texte */
}

.licence-validate-button {
  width: 100%; /* Bouton occupe toute la largeur du conteneur */
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.goback-button {
  width: 100px;
  position: absolute;
  bottom: 5%;
  right: 10%;
  transform: translate(-50%, -50%);
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

</style>
