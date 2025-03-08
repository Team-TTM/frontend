<template>
  <header>
    <LogoTTM/>
    <boutons-header/>
  </header>
  <div class="main-container">
    <div id="PageText">
      Vous êtes sur la page d'accueil
      <router-link to="/users/csvListeAdherent">
        <button id="button">Accéder à la BD</button>
      </router-link>
    </div>
  </div>
  <footer>
      © 2025 - Site TTM | Auteur | Support
    </footer>
</template>

<script setup>

import LogoTTM from "@/components/LogoTTM.vue";
import BoutonsHeader from "@/components/boutonsHeader.vue";
</script>

<style scoped>
#button{
  border : solid 2px red;
}
#PageText{
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px 24px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  color:red;
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

p{
  font-weight: bold;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#instagram{
  color:greenyellow;
}

#newsletter{
  color:pink;
}


#container-instagram{
  height: 90vh;
  width: 50vw;
  margin: 10px;
  background-color: #444444;
  border-radius: 10px;
  z-index:11;
}
#container-newsletter{
  height: 90vh;
  width: 50vw;
  margin: 10px;
  background-color: green;
  border-radius: 10px;
  z-index:10;
}



</style>
