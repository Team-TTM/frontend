<template>
  <header>
    <img alt="Vue logo" class="logo" src="../assets/logo/logottm.svg" width="125" height="75"/>
  </header>
  <div id="app">
    <main class="auth-container">
      <h1 class="titre-auth-page">
        BIENVENUE !
      </h1>
      <div class="container container-google-facebook">
        <GoogleBouton/>
        <FacebookBouton/>
      </div>
    </main>
  </div>
  <footer>
      © 2025 - Site TTM | Auteur | Support
  </footer>

</template>


<script setup>
import GoogleBouton from "@/components/boutons authentification/BoutonGoogle.vue";
import FacebookBouton from "@/components/boutons authentification/BoutonFacebook.vue";
</script>

<style scoped>
.logo {
  width: 130px; /* Ajuste la taille du logo selon tes besoins */
  height: auto;
  margin-right: 20px;
  border-radius: 10px;
  margin-left: 0;
  display: inline-block;
  transition-duration: 0.4s;

}

.auth-container{
  background-color:white;
}

</style>
