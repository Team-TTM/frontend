<script setup>

import LogoTTM from "@/components/LogoTTM.vue";
import BoutonsHeader from "@/components/boutonsHeader.vue";
import {User} from '@vicons/fa'
import {LogOutSharp as Disconnect} from '@vicons/material'
import {store} from '@/store/index.js';
import {useRouter} from 'vue-router';

const router = useRouter();
const disconnect = async () => {
  await store.dispatch('logout');
  await router.push({name: 'Accueil-auth'});
}

const goToProfile = async () => {
  await router.push({name: 'Profile'});
}

defineProps({
  connected: Boolean
});

</script>

<template>
  <div class="header">
    <LogoTTM />
      <boutons-header v-if="connected"/>
    <n-icon v-if="connected" class="bouton-icon" size="40" @click="goToProfile">
        <User/>
      </n-icon>
      <n-icon v-if="connected" class="bouton-icon" size="40" @click="disconnect">
        <Disconnect/>
    </n-icon>
  </div>

</template>

<style scoped>
.header{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 150px;
    max-height: 150px;
  background-color: #ffffff; /* Ajoutez une couleur de fond si nécessaire */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 0 20px;
}


.bouton-icon {
  color: black; /* Toujours noir */
  cursor: pointer;
  transition: color 0.3s ease; /* Animation fluide */
}

.bouton-icon:hover {
  color: #b52b1d;
}


</style>
