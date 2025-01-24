<template>
  <main class="main-content">
    <div class="logo">
      <LogoTTM/>
    </div>
    <h1>BIENVENUE SUR LE SITE DU TTM</h1>
    <router-link to="/signup">
      <button class="btn full-page-button signup-button">S'inscrire</button>
    </router-link>
    <div class="divider">
      <hr class="line" />
      <span>OU</span>
      <hr class="line" />
    </div>
    <div class="social-icons full-page-button">
      <GoogleBouton />
      <FacebookBouton />
    </div>
  </main>
</template>

<script setup>
import GoogleBouton from "@/components/boutons authentification/BoutonGoogle.vue";
import FacebookBouton from "@/components/boutons authentification/BoutonFacebook.vue";
import LogoTTM from "@/components/icons/LogoTTM.vue";
</script>

<style scoped>
/* Styles de la page d'accueil */
.main-content {
  width: 100%;
  max-width: 400px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
}

.logo{
  position: absolute;
  top: 30%;
  left:50%;
}

h1 {
  position: absolute;
  top: 5%;
  left:35%;
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

.signup-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #4caf50;
  color: white;
  border: none;
}

.divider {
  position: absolute;
  bottom : 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.divider .line {
  flex: 1;
  height: 1px;
  background: #ccc;
}

span {
  margin: 0 10px;
  font-size: 1rem;
  color: #888;
}

.social-icons {
  position:absolute;
  left:39.5%;
  bottom: 20%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}
</style>
