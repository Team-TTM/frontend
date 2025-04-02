<template>
  <router-link class="logo-container" to="/">
    <img alt="Vue logo" class="logo" height="240" src="../assets/logo/logottm.svg" width="1748"/>
  </router-link>
</template>
<style scoped>

.logo-container{
  height: 100%;
  display: flex;
  align-items: center;
}

.logo{
  max-height: 100%; /* Ne dépasse pas la hauteur du header */
  width: auto; /* Garde le ratio */
}


</style>
<script setup>
</script>
