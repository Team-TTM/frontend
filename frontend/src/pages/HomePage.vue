<template>
  <div id="page-container">
    <header>
      <LogoTTM/>
      <boutons-header/>
    </header>
    <div id="HomeText">
      Vous êtes sur la page d'accueil
    </div>
    <footer>
      © 2025 - Site TTM | Auteur | Support
    </footer>
  </div>
</template>

<script setup>

import LogoTTM from "@/components/LogoTTM.vue";
import BoutonsHeader from "@/components/boutonsHeader.vue";
</script>

<style scoped>
#HomeText{
  position: absolute;
  top:50%;
  left:40%;
  color:red;
  font-weight: bold;
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

p{
  font-weight: bold;
  text-transform: uppercase;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#page-container{
  display: flex;
  height: 100vh;
  width: 100vw;
}

#main{
  display:flex;
  background: lightgray;
  padding: 20px;
  text-align: center;
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
