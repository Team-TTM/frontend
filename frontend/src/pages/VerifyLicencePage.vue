<template>
  <header>
    <img class="logo" alt="LogoTTM" src="@/assets/logo/logottm.svg">
  </header>
  <div id="app">
    <main class="main-container">
      <h1>
        Saisie du numéro de Licence
      </h1>
      <div class="container container-licence-input">
        <LicenceInput/>
      </div>
    </main>
    <router-link to="/">
      <button class="retour-button">Retour</button>
    </router-link>
  </div>
  <footer>
    © 2025 - Site TTM | Auteur | Tous droits réservés
  </footer>
</template>


<script setup>
import LicenceInput from '@/components/LicenceInput.vue';
</script>

<style scoped>


</style>
