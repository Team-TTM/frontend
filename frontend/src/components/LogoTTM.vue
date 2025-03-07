<template>
  <router-link to="/users/HomePage">
    <img alt="Vue logo" class="logo" src="../assets/logo/logottm.svg" width="125" height="75"/>
  </router-link>
</template>
<style scoped>

.logo {
  width: 130px; /* Ajuste la taille du logo selon tes besoins */
  height: auto;
  margin-right: 20px;
  border-radius: 10px;
  margin-left: 0;
  display: inline-block;
  transition-duration: 0.4s;

}

.logo:hover{
  box-shadow : 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>
<script setup lang="ts">
</script>
