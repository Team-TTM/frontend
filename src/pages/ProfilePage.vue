<template>
  <header>
    <LogoTTM />
    <boutons-header />
  </header>

  <div id="app">
    <main class="main-container">
      <h1 class="title">Éditer le profil</h1>
      <div class="content">
        <!-- Formulaire de profil -->
        <form class="profile-form">
          <!-- Section Gauche -->
          <div class="left-section">
            <label for="licence">N° de licence (cliquez ici pour télécharger la licence)</label>
            <input id="licence" type="text" v-model="profil.licence" />

            <input type="text" v-model="profil.nom" :readonly="!editMode" />
            <input type="text" v-model="profil.prenom" :readonly="!editMode" />
            <input type="text" v-model="profil.licence" :readonly="!editMode" />
            <input type="email" v-model="profil.email" :readonly="!editMode" />
            <input type="date" v-model="profil.dateNaissance" :readonly="!editMode" />
            <input type="tel" v-model="profil.telephone" :readonly="!editMode" />
          </div>

          <!-- Section Droite -->
          <div class="right-section">
            <!-- Radios en colonne -->
            <div class="categorie">
              <label><input type="radio" v-model="profil.categorie" value="Loisir" /> Loisir</label>
              <label><input type="radio" v-model="profil.categorie" value="Compétition" /> Compétition</label>
              <label><input type="radio" v-model="profil.categorie" value="Triathlon Court" /> Triathlon court (XS/S/M)</label>
              <label><input type="radio" v-model="profil.categorie" value="Triathlon Long" /> Triathlon long (L/XL/XXL)</label>
              <label><input type="radio" v-model="profil.categorie" value="Handisports" /> Handisports</label>
            </div>


            <div class="buttons-container">
              <router-link to="/users/performances">
                <button class="btn">Performances</button>
              </router-link>

              <router-link to="/users/donnees_medicales">
                <button class="btn">Données médicales</button>
              </router-link>
            </div>
          </div>
          <!-- Bouton Valider en bas à droite -->
          <button class="validate-button" @click.prevent="validerProfil">Valider</button>
          <button class="edit-button" @click="editMode ? sauvegarderProfil() : editMode = true">
            {{ editMode ? "Sauvegarder" : "Modifier" }}
          </button>
        </form>
      </div>
    </main>
  </div>

  <footer>
    © 2025 - Site TTM | Auteur | Support
  </footer>
</template>




<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import LogoTTM from "@/components/LogoTTM.vue";
import {useStore} from 'vuex';
import BoutonsHeader from "@/components/boutonsHeader.vue";

const store = useStore();
const editMode = ref(false);

// Données du profil
const profil = ref({
  licence: "",
  nom: "",
  prenom: "",
  genre: "",
  email: "",
  dateNaissance: "",
  telephone: "",
  categorie: "",
});


// Récupération des données utilisateur lors du montage du composant
onMounted(async () => {
  try {
    const uri = "/users/adherent";
    const token = store.getters.getToken;
    console.log(token);

    const response = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      validateStatus: () => true, // Accepter tous les statuts HTTP
    });

    console.log("Réponse de l'API :", response.data);

    profil.value = {
      licence: response.data.licence || "",
      nom: response.data.nom || "",
      prenom: response.data.prenom || "",
      genre: response.data.genre || "",
      email: response.data.email || "",
      dateNaissance: response.data.dateNaissance || "",
      telephone: response.data.telephone || "",
      categorie: response.data.categorie || "",
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
});

const sauvegarderProfil = async () => {
  if (!editMode.value) return; // Ne sauvegarder que si on est en mode édition

  try {
    const uri = "/users/adherent";
    const token = store.getters.getToken;

    await axios.put(uri, profil.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Profil mis à jour avec succès !");
    editMode.value = false; // Repasser en mode lecture seule
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
  }
};
</script>----------------------------------------------------------------------------

<style scoped>
/* Titre bien positionné */
.title {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px 24px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
}

/* Formulaire structuré en deux colonnes */
.profile-form {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Deux colonnes */
  gap: 20px;
  max-width: 900px;
  margin: auto;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
}

/* Section Gauche */
.left-section {
  display: flex;
  flex-direction: column;
}

.left-section input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Section Droite */
.right-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* Boutons Performances et Données Médicales */
.buttons-container {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 15px;
  margin-top: 50px;
}

.btn {
  background-color: #6c757d;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #5a6268;
}

/* Radios en colonne */
.categorie {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Bouton Valider en bas à droite */
.validate-button {
  grid-column: span 2; /* Étend sur toute la largeur */
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  justify-self: end;
}

.validate-button:hover {
  background-color: #0056b3;
}

.content {
  margin-top: 140px; /* Ajustez cette valeur selon vos besoins */
}

.edit-button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.edit-button:hover {
  background-color: #218838;
}

@media (max-width: 768px) {
  .profile-form {
    grid-template-columns: 1fr; /* Une seule colonne sur les petits écrans */
  }
  .validate-button {
    justify-self: center; /* Centrer le bouton sur les petits écrans */
  }
}
</style>

