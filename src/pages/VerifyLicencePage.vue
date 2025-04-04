<template>
  <div id="app">
    <main class="main-container">
      <div class="container container-licence-input">
        <h1>
          Saisie du numéro de Licence
        </h1>
        <LicenceInput/>
      </div>
    </main>
    <router-link to="/accueil-auth">
      <button class="retour-button">Retour</button>
    </router-link>
  </div>
</template>


<script setup>
import LicenceInput from '@/components/LicenceInput.vue';
</script>

<style scoped>


</style>
