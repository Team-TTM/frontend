<template>
  <header>
    <img class="logo" alt="LogoTTM" src="@/assets/logo/logottm.svg">
  </header>
  <div id="app">
    <main class="main-container">
      <h1>
        BIENVENUE !
      </h1>
      <div class="container container-google-facebook">
        <GoogleBouton/>
        <FacebookBouton/>
        <router-link to="/users/csvListeAdherent">
          <button class="liste ADH">go to liste adherents</button>
        </router-link>
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
import LicenceInput from "@/components/LicenceInput.vue";
</script>

<style scoped>
.bouton{
  position: absolute;
  top: 10%;
}

</style>
