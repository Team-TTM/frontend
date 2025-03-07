<template>
  <button class="facebook-button" @click="loginWithFacebook">
    <img width="35" height="35" src="https://img.icons8.com/color/48/facebook-new.png" alt="Google" />
    <span>Se connecter avec Facebook</span>
  </button>
</template>

<script setup>

  const loginWithFacebook = ()=> {
    window.location.href =  '/users/auth/facebook';
  }


</script>

<style scoped>


.facebook-button {
  display: flex; /* Utilisation de Flexbox */
  align-items: center;     /* Centre verticalement */
  justify-content: space-around;
  text-align: center;      /* Centre le texte (utile si le texte est sur plusieurs lignes) */
  background-color: #039be5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  height: 10vh;
  min-height : 5vh;
  width: 25vw;
  min-width: 20vw;
}
.facebook-button:hover {
  background-color: #0374e5;
}
</style>

