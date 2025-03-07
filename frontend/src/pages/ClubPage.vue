<script setup>
import LogoTTM from "@/components/LogoTTM.vue";
import BoutonsHeader from "@/components/boutonsHeader.vue";
</script>

<template>
  <div id="page-container">
    <header>
      <LogoTTM/>
      <boutons-header/>
    </header>
    <div id="ClubText">
      Vous êtes sur la page du club
    </div>
    <footer>
      © 2025 - Site TTM | Auteur | Support
    </footer>
  </div>
</template>

<style scoped>
#ClubText{
  position: absolute;
  top:50%;
  left:40%;
  color:red;
  font-weight: bold;
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}


</style>
