<!-- HelloWorld pas comme les autres  -->
<script setup>
import { ref } from "vue";

// État pour gérer la page visible
const currentPage = ref("home"); // "home" par défaut

// Fonction pour passer à la page "S'inscrire"
const goToSignup = () => {
  currentPage.value = "signup";
};

// Fonction pour revenir à la page d'accueil
const goToHome = () => {
  currentPage.value = "home";
};
</script>

<template>
  <div class="page-container">
    <!-- Utilisation du composant <transition> -->
    <transition name="fade" mode="out-in">
      <!-- Page principale -->
      <div v-if="currentPage === 'home'" key="home" class="home-page">
        <header class="header">
          <button class="back-button" @click="goToHome">←</button>
          <h1 class="title">TTM</h1>
        </header>
        <main class="main-content">
          <button class="btn sign-up" @click="goToSignup">S'inscrire</button>
          <button class="btn login">Se connecter</button>
          <div class="divider">
            <hr class="line" />
            <span>OU</span>
            <hr class="line" />
          </div>
          <div class="social-icons">
            <button class="social-button">?</button>
            <button class="social-button">?</button>
          </div>
        </main>
      </div>

      <!-- Page "S'inscrire" -->
      <div v-else-if="currentPage === 'signup'" key="signup" class="signup-page">
        <main class="signup-content">
          <button class="btn full-page-button name-button">Numéro de Licence</button>
          <button class="btn full-page-button validate-button" @click="goToHome">Valider</button>
        </main>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* --- Animations pour la transition fade --- */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Conteneur global */
.page-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

/* --- Header --- */
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.title {
  font-size: 1.5rem;
  margin: 0 auto;
}

.back-button {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* --- Style de la page principale --- */
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.main-content {
  width: 90%;
  max-width: 400px;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin: 15px 0;
  padding: 10px;
  font-size: 1.2rem;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}

.sign-up {
  background-color: #4CAF50; /* Vert */
  color: white;
  border: none;
}

.login {
  background-color: white;
  color: #4CAF50;
  border: 2px solid #4CAF50;
}

/* --- Ligne "OU" --- */
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
}

.divider .line {
  flex: 1;
  height: 1px;
  background: #ccc;
}

.divider span {
  margin: 0 10px;
  font-size: 1rem;
  color: #888;
}

/* --- Boutons sociaux --- */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.social-button:hover {
  background: #bbb;
}

/* --- Style de la page "S'inscrire" --- */
.signup-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.signup-page .signup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 0;
}

/* --- Bouton "N° Licence" au centre --- */
.full-page-button.name-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 300px; /* Même taille que le bouton S'inscrire */
  height: auto;
  padding: 10px;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* --- Bouton "Valider" en bas à droite --- */
.full-page-button.validate-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 100%;
  max-width: 300px; /* Même taille que le bouton S'inscrire */
  height: auto;
  padding: 10px;
  font-size: 1.2rem;
  background-color: #2196F3;
  color: white;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Hover effects */
.full-page-button:hover {
  opacity: 0.9;
}
</style>
