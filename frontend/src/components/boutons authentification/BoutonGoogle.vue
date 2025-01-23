<script setup>
import googleLogo from '@/assets/logo-google.ico'; // Importation de l'image locale

function handleGoogleClick() {
  console.log('Connexion avec Google');
}
</script>

<template>
  <button @click="handleGoogleClick" class="google-button">
    <img
      :src="googleLogo"
      alt="Logo Google"
      class="google-logo"
    />
  </button>
</template>

<style scoped>
.google-button {
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

.google-button:hover {
  background-color: #f5f5f5;
}

.google-logo {
  width: 24px; /* Augmente la taille de l'image (de 20px à 24px) */
  height: auto;
  margin-right: 8px; /* Garde un espacement proportionnel */
}
</style>

