<template>
  <button class="boutonGoogle" @click="redirectToGoogleOAuth">
    <img width="35" height="35" src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
    <span>Se connecter avec Google</span>
  </button>
</template>

<script setup>


const redirectToGoogleOAuth = () => {
  window.location.href = '/users/auth/google';
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
  font-weight: bold;
  height: 10vh;
  min-height : 5vh;
  width: 25vw;
  min-width: 20vw;
}
.boutonGoogle:hover {
  background-color: #F0F8FF;
}

</style>
