<template>
  <button class="boutonGoogle" @click="redirectToGoogleOAuth">
    <img width="35" height="35" src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
    <span>Se connecter avec Google</span>
  </button>
</template>

<script setup>
const GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const GOOGLE_CLIENT_ID = "758592485171-8s2snaqkej804kfe3pt2sifnuvfs5j9o.apps.googleusercontent.com"
const GOOGLE_CALLBACK_URL = "http://localhost:3000/users/google/callback"
const GOOGLE_OAUTH_SCOPES = [
  "email",
  "profile",
  "openid"
];

const redirectToGoogleOAuth = () => {
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const state = "some_state";
  const url = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${encodeURIComponent(scopes)}`;

  window.location.href = url;
};
</script>

<style scoped>

.boutonGoogle {
  display: flex; /* Utilisation de Flexbox */
  align-items: center;     /* Centre verticalement */
  justify-content: space-around; /* Centre horizontalement */
  text-align: center;      /* Centre le texte (utile si le texte est sur plusieurs lignes) */
  background-color: white;
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
