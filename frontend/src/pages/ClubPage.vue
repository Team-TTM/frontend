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
    <div class="main-container">
      <div id="PageText">
        Vous êtes sur la page du club
      </div>
    </div>
    <footer>
      © 2025 - Site TTM | Auteur | Support
    </footer>
  </div>
</template>

<style scoped>
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

</style>
