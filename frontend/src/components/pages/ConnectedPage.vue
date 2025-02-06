<template>
  <h1>Vous êtes connecté</h1>
  <router-link to="/users/signup">
    <bouton-retour/>
  </router-link>
</template>

<script setup>
import BoutonRetour from "@/components/BoutonRetour.vue";
</script>

<style scoped>
.icon-container{
  position:relative;
}

h1 {
  position: absolute;
  top: 40%;
  left:42%;
  margin: 1rem 0;
  color: red;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
}

</style>
