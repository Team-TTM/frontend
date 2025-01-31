<template>
  <main class="main-content">
    <div class="logo">
      <LogoTTM />
    </div>
    <h1>BIENVENUE !</h1>
    <div class="button-container">
        <GoogleBouton/>
        <FacebookBouton/>
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
  top: 8%;
  left:12%;
  width: 200px;
}

h1 {
  position: absolute;
  top: 25%;
  left:44%;
  margin: 1rem 0;
  color: red;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
}

/* Conteneur pour le bouton "S'inscrire" et les boutons sociaux */
.button-container {
  position: absolute;
  top:33%;
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

span {
  margin: 0 10px;
  font-size: 1rem;
  color: #888;
}

</style>
