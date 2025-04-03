<template>
  <div class="main-container">
    <div id="PageText">
      <h1>
        Vous êtes sur la page d'accueil
      </h1>
      <h2>
        Vous êtes connecter en tant que {{ role }}
      </h2>
      <router-link v-if="role !== userRole.USER" id="bouton" to="/users/csvListeAdherent">
        accéder à la liste des adhérents
      </router-link>
    </div>
  </div>
  <footer>
      © 2025 - Site TTM | Auteur | Support
  </footer>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import {useLoadingBar} from 'naive-ui';
import {useStore} from 'vuex';
import {userRole} from '@/enums/userRole.js';

const loadingBar = useLoadingBar();
const store = useStore();

const role = computed(() => {
  return store.getters.getRole;
})

onMounted(() => {
  const token = new URLSearchParams(window.location.search).get('token');
  loadingBar.finish();

  if (token) {
    store.dispatch('login', token);
    console.log('Token stocké :', store.getters.isAuthenticated, store.getters.getToken);
  }
});
</script>
<style scoped>


#bouton{
  position:relative;
  min-width :15vw;
  height: 7.5vh;
  cursor: pointer;
  border: none;
  border-radius : 10px;
  background-color: #b52b1d;
  color:#ffffff;
  font-weight: bold;
  font-size: 11px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  transition-duration: 0.4s;
  text-align : center;
  text-transform: uppercase;
  margin: 10px;
  display: flex;
  justify-content: center; /* Centre horizontalement */
  align-items: center;
  text-decoration: none;
}

#bouton:hover{
  background-color: #ffffff;
  color:#b52b1d;
  box-shadow : 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}



p{
  font-weight: bold;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}



</style>
