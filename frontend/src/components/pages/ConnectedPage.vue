<template>
  <h1>Vous êtes connecté</h1>
  <router-link to="/signup">
    <button class="retour-connected full-page-button" id="retour-connected">Retour</button>
  </router-link>
</template>

<script setup>

</script>

<style scoped>

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

.full-page-button {
  width: 100%;
  max-width: 300px;
  margin: 15px 0;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2rem;
}

.retour-connected {
  width: 100px;
  position: absolute;
  bottom: 5%;
  right: 10%;
  transform: translate(-50%, -50%);
  background-color: #ee261d;
  color: white;
  border: none;
  cursor: pointer;
}

.retour-connected:hover{
  background-color: #c1150d;
}

</style>
