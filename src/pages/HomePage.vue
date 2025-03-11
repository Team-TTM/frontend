<template>
  <header>
    <LogoTTM/>
    <boutons-header/>
  </header>
  <div class="main-container">
    <div id="PageText">
      Vous êtes sur la page d'accueil
      <router-link to="/users/csvListeAdherent">
        <button id="bouton">Accéder à la BD</button>
      </router-link>
    </div>
    <div class="instagram-newsletter-container">
      <div class="instagram-container">

      </div>
      <div class="newsletter-container">

      </div>
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

.instagram-newsletter-container{
  display:flex;
  flex-direction: row;
  position:fixed;
  height:70%;
  width:100%;
  margin-top:30px;
  background-color: white;
}

.instagram-container{
  display:flex;
  height:90%;
  width:80%;
  background-color: white;
  border-radius:10px;
  margin-top: 40px;
  margin-right: 10px;
  margin-left: 20px;
  /*box-shadow: -2px 3px 6px rgba(0, 0, 0, 0.8);*/
}

.newsletter-container{
  display:flex;
  height:90%;
  width:80%;
  background-color: white;
  border-radius:10px;
  margin-top: 40px;
  margin-right: 20px;
  margin-left: 10px;
  /*box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.8);*/
}

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
