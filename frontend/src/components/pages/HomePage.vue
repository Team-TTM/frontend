<template>
  <main class="main-content">
    <div class="logo">
      <LogoTTM />
    </div>
    <h1>BIENVENUE SUR LE SITE DU TTM</h1>
    <div class="button-container">
      <router-link to="/signup">
        <button class="btn signup-button" id="inscription">S'inscrire</button>
      </router-link>
      <div class="divider">
        <hr class="line" />
        <span>OU</span>
        <hr class="line" />
      </div>
      <div class="social-icons">
        <GoogleBouton />
        <FacebookBouton />
      </div>
    </div>
  </main>
</template>


<script setup>
import GoogleBouton from "@/components/boutons authentification/BoutonGoogle.vue";
import FacebookBouton from "@/components/boutons authentification/BoutonFacebook.vue";
import LogoTTM from "@/components/icons/LogoTTM.vue";
</script>

<style scoped>
/* Styles de la page d'accueil */
.main-content {
  width: 100%;
  max-width: 400px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
  left:35%;
  margin: 1rem 0;
  color: red;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
}

/* Conteneur pour le bouton "S'inscrire" et les boutons sociaux */
.button-container {
  position: absolute;
  top:40%;
  left:39%;
  width: 100%; /* Occupe toute la largeur disponible */
  max-width: 350px; /* Limite la largeur maximale */
  padding: 20px; /* Ajoute de l'espace interne */
  background-color: #f2f2f2; /* Fond gris clair */
  border-radius: 10px; /* Coins arrondis */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Légère ombre */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Espacement entre les éléments */
  margin: 20px 0; /* Espacement externe pour le conteneur */
}

.signup-button {
  width: 100%; /* Le bouton occupe toute la largeur du conteneur */
  max-width: 300px; /* Limite sa largeur */
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  cursor: pointer;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Occupe toute la largeur du conteneur */
}

.divider .line {
  flex: 1; /* Permet aux lignes de s'étirer */
  height: 1px;
  background: #ccc;
  margin: 0 10px; /* Espacement autour des lignes */
}

.social-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px; /* Espacement entre les boutons sociaux */
  width: 100%;
}

span {
  margin: 0 10px;
  font-size: 1rem;
  color: #888;
}

</style>
