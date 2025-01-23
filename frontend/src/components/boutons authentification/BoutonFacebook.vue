<script setup>
import facebookLogo from '@/assets/logo-facebook.ico'; // Importation de l'image locale

function handleFacebookClick() {
  console.log('Connexion avec Facebook');
}
</script>

<template>
  <button @click="handleFacebookClick" class="facebook-button">
    <img
      :src="facebookLogo"
      alt="Logo Facebook"
      class="facebook-logo"
    />
  </button>
</template>

<style scoped>
.facebook-button {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 20px; /* Augmentation de l'espacement (de 8px à 10px) */
  cursor: pointer;
  font-size: 18px; /* Augmentation de la taille du texte (de 16px à 18px) */
  color: #333;
}

.facebook-button:hover {
  background-color: #f5f5f5;
}

.facebook-logo {
  width: 24px; /* Augmente la taille de l'image (de 20px à 24px) */
  height: auto;
  margin-right: 8px; /* Garde un espacement proportionnel */
}
</style>
