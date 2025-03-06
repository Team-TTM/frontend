<template>
  <header>
    <router-link to="/">
      <img alt="Vue logo" class="logo logo-link" src="../assets/logo/logottm.svg" width="125" height="75"/>
    </router-link>
  </header>
</template>
<style scoped>


.logo-link {
  display: inline-block; /* Empêche le lien de prendre toute la largeur */
}

.logo {
  width: 100px; /* Ajuste la taille du logo selon tes besoins */
  height: auto;
}
</style>
<script setup lang="ts">
</script>
