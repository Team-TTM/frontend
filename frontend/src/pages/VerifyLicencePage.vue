<template>
  <header>
    <LogoTTM/>
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
    © 2025 - Site TTM | Auteur | Support
  </footer>
</template>


<script setup>
import LicenceInput from '@/components/LicenceInput.vue';
import LogoTTM from "@/components/LogoTTM.vue";
</script>

<style scoped>


</style>
