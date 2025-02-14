<template>
  <button class="boutonGoogle" @click="redirectToGoogleOAuth">
    <img width="35" height="35" src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
    <span>Se connecter avec Google</span>
  </button>
</template>

<script setup>


const redirectToGoogleOAuth = () => {
  window.location.href = 'http://localhost:3000/users/auth/google';
};
</script>

<style scoped>

.boutonGoogle {
  display: flex; /* Utilisation de Flexbox */
  align-items: center;     /* Centre verticalement */
  justify-content: space-around; /* Centre horizontalement */
  text-align: center;      /* Centre le texte (utile si le texte est sur plusieurs lignes) */
  background-color: #f2f2f2;
  color: #4267b2;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  height: 50px;
  width: 300px; /* Ajuste la largeur au texte */
  min-width: 200px;   /* Assure un minimum de largeur */
}
.boutonGoogle:hover {
  background-color: #F0F8FF;
}

</style>
