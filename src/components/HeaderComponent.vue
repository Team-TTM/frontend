<script setup>

import LogoTTM from "@/components/LogoTTM.vue";
import BoutonsHeader from "@/components/boutonsHeader.vue";
import {User} from '@vicons/fa'

</script>

<template>
  <div class="header">
    <LogoTTM />
    <boutons-header />
    <n-icon :style="{ color: 'black' }" size="40" class="profil-icon">
      <router-link to="/profil">
        <User/>
      </router-link>
    </n-icon>
  </div>

</template>

<style scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* Fixe le header en haut */
  top: 0;
  left: 0;
  width: 100%; /* Assure qu'il occupe toute la largeur */
  height: 15vh;
  background-color: #ffffff; /* Ajoutez une couleur de fond si nécessaire */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 0 20px;
}

.profil-icon{
  margin: 60px;
}
</style>
