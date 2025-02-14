<template>
  <header>
    <img class="logo" alt="LogoTTM" src="@/assets/logo/logottm.svg">
  </header>
  <div id="app">
    <main class="main-container">
      <h1>
        Vous êtes connecté
      </h1>
    </main>
    <router-link to="/users/verify-licence">
      <button class="retour-button">Retour</button>
    </router-link>
  </div>
  <footer>
    © 2025 - Site TTM | Auteur | Support
  </footer>

</template>

<script setup>

import LicenceInput from "@/components/LicenceInput.vue";
</script>

