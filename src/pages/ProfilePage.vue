<template>
  <header>
    <LogoTTM />
    <boutons-header />
  </header>

  <div id="app">
    <main class="main-container">

      <div class="content">

        <form class="profile-form" @submit.prevent>
          <h1 class="title">Éditer le profil</h1>
          <!-- Section Gauche -->
          <div class="left-section">
            <label for="licence">N° de licence (cliquez ici pour télécharger la licence)</label>
            <input id="licence" type="text" v-model="profil.licence" readonly/>

            <input type="text" v-model="profil.nom" :readonly="!editMode" />
            <input type="text" v-model="profil.prenom" :readonly="!editMode" />
            <input type="email" v-model="profil.email" :readonly="!editMode" />
            <input type="date" v-model="formattedDateNaissance" :readonly="!editMode" />
            <input type="tel" v-model="profil.telephone" :readonly="!editMode" />
          </div>

          <!-- Section Droite -->
          <div class="right-section">
            <!-- Radios en colonne -->
            <div class="pratique-container">
              <h2 class="pratique-title">Pratique</h2>
              <div class="radio-group">
                <label v-for="option in options" :key="option" class="radio-label">
                  <input
                    type="radio"
                    name="pratique"
                    :value="option"
                    v-model="profil.pratique"
                    class="form-radio"
                    :disabled="!editMode"
                  />
                  <span>{{ option }}</span>
                </label>
              </div>
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

          <div class="action-buttons">
            <button class="edit-button" @click="toggleEditMode">
              {{ editMode ? "Sauvegarder" : "Modifier" }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>

  <footer>
    © 2025 - Site TTM | Auteur | Support
  </footer>
</template>

<script>
import axios from "axios";
import LogoTTM from "@/components/LogoTTM.vue";
import {useStore} from 'vuex';
import BoutonsHeader from "@/components/boutonsHeader.vue";

export default {
  components: {
    LogoTTM,
    BoutonsHeader,
  },
  data() {
    return {
      editMode: false,
      profil: {
        licence: "",
        nom: "",
        prenom: "",
        genre: "",
        email: "",
        dateNaissance: "",
        telephone: "",
        pratique: "",
      },
      options: [
        "Compétition de manière régulière",
        "Compétition occasionnelle",
        "Entrainement",
        "Ne pratique pas",
      ],
    };
  },
  computed: {
    token() {
      return useStore().getters.getToken;
    },
    formattedDateNaissance() {
      return this.profil.dateNaissance ? this.formatDate(this.profil.dateNaissance) : "";
    },
  },
  mounted() {
    this.recupererProfil();
  },
  methods: {
    toggleEditMode() {
      if (this.editMode) {
        this.sauvegarderProfil();
      } else {
        this.editMode = true;
      }
    },
    formatDate(isoString) {
      if (!isoString) return '';
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    },
    async recupererProfil() {
      const uri = "/users/adherent";
      try {
        if (!this.token) {
          throw new Error("Token d'authentification non disponible");
        }

        const response = await axios.get(uri, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
          validateStatus: () => true,
        });
        console.log(response.data)
        if (response.status !== 200) {
          throw new Error(`Erreur API: ${response.status} - ${response.data.message || "Réponse inattendue"}`);
        }

        this.profil = {
          licence: response.data.numeroLicence || "",
          nom: response.data.nom || "",
          prenom: response.data.prenom || "",
          genre: response.data.genre || "",
          email: response.data.email || "",
          dateNaissance: response.data.dateNaissance || "",
          telephone: response.data.telephone || "",
          pratique: response.data.pratique || "",
        };
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    },

    async sauvegarderProfil() {
      const uri = "/users/adherent";
      try {

        if (!this.token) {
          throw new Error("Token d'authentification non disponible");
        }

        const response = await axios.put(uri, this.profil, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          throw new Error(`Échec de la mise à jour : ${response.status} - ${response.data.message || "Erreur inconnue"}`);
        }
        console.log("Profil mis à jour avec succès !");
        this.editMode = false;
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error);
      }
    },
  },
};
</script>

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




.content {
  margin-top: 140px; /* Ajustez cette valeur selon vos besoins */
}


@media (max-width: 768px) {
  .profile-form {
    grid-template-columns: 1fr; /* Une seule colonne sur les petits écrans */
  }
  .validate-button {
    justify-self: center; /* Centrer le bouton sur les petits écrans */
  }
}

.pratique-container {
  padding: 16px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.pratique-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-radio {
  color: #1e40af; /* Couleur bleu pour les boutons radio */
}

action-buttons {
  display: flex;
  justify-content: flex-end; /* Aligne les boutons à droite */
  gap: 10px;
  margin-top: 20px;
  width: 100%; /* Assure que le conteneur prend toute la largeur disponible */
}

.edit-button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute; /* Positionne le bouton relativement à son conteneur */
  right: 20px; /* Aligne le bouton à 20px du côté droit */
  bottom: 20px; /* Aligne le bouton en bas à droite, vous pouvez ajuster si nécessaire */
}

.edit-button:hover :hover {
  background-color: #218838;
}
</style>

