<template>
  <button class="facebook-button" @click="loginWithFacebook">
    <img width="35" height="35" src="https://img.icons8.com/color/48/facebook-new.png" alt="Google" />
    <span>Se connecter avec Facebook</span>
  </button>
</template>
<script setup>

  const loginWithFacebook = ()=> {
    window.location.href = 'http://localhost:3000/users/auth/facebook';
  }


</script>

<style scoped>


.facebook-button {
  display: flex; /* Utilisation de Flexbox */
  align-items: center;     /* Centre verticalement */
  justify-content: space-around; /* Centre horizontalement */
  text-align: center;      /* Centre le texte (utile si le texte est sur plusieurs lignes) */
  background-color: #039be5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  height: 50px;
  width: 300px; /* Ajuste la largeur au texte */
  min-width: 200px;   /* Assure un minimum de largeur */
}
.facebook-button:hover {
  background-color: #0374e5;
}
</style>

