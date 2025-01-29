<template>
  <button @click="redirectToGoogleOAuth" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
    Se connecter avec Google
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
