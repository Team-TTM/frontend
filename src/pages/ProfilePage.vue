<template>
  <div id="app">
    <main class="main-container">

      <div class="content">
        <h1 class="titre">Éditer le profil</h1>
        <form class="profile-form" @submit.prevent>

          <div class="left-section">
            <label for="numeroLicence">N° de licence (cliquez ici pour télécharger la licence)</label>
            <input id="numeroLicence" type="text" v-model="adherent.numeroLicence" readonly/>

            <input
              type="text"
              v-model="adherent.nom"
              :readonly="!editMode"
              :placeholder="getPlaceholder('nom')"
              :class="{'placeholder-style': !adherent.nom}"
            />

            <input
              type="text"
              v-model="adherent.prenom"
              :readonly="!editMode"
              :placeholder="getPlaceholder('prenom')"
              :class="{'placeholder-style': !adherent.prenom}"
            />

            <input
              type="email"
              v-model="adherent.email"
              :readonly="!editMode"
              :placeholder="getPlaceholder('email')"
              :class="{'placeholder-style': !adherent.email}"
            />

            <input
              type="date"
              v-model="adherent.dateNaissance"
              :readonly="!editMode"
              :class="{'placeholder-style': !adherent.dateNaissance}"
            />

            <input
              type="tel"
              v-model="adherent.telephone"
              :readonly="!editMode"
              :placeholder="getPlaceholder('telephone')"
              :class="{'placeholder-style': !adherent.telephone}"
            />

            <input
              type="tel"
              v-model="adherent.urgenceTelephone"
              :readonly="!editMode"
              :placeholder="getPlaceholder('urgenceTelephone')"
              :class="{'placeholder-style': !adherent.urgenceTelephone}"
            />
          </div>

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
                    v-model="adherent.pratique"
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
            </div>
            <h2>📅 Mes événements</h2>

            <div v-if="eventsRegistered.length">
              <ul class="event-list">
                <li v-for="event in eventsRegistered" :key="event.eventId" class="event-card">
                  <h3>{{ event.name }}</h3>
                  <p>📍 <strong>Lieu :</strong> {{ event.lieu || "Non spécifié" }}</p>
                  <p>🕒 <strong>Date :</strong> {{ formatDate(event.endAt) }}</p>
                </li>
              </ul>
            </div>

            <p v-else class="no-events">Tu n'es inscrit à aucun événement pour le moment.</p>
          </div>
          <button class="edit-button" @click="toggleEditMode">
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

<script>
import axios from "axios";
import LogoTTM from "@/components/LogoTTM.vue";
import {useStore} from 'vuex';
import BoutonsHeader from "@/components/boutonsHeader.vue";
import {useMessage} from "naive-ui";


export default {
  components: {
    LogoTTM,
    BoutonsHeader,
  },
  data() {
    return {
      editMode: false,
      adherent: {
        numeroLicence: "",
        nom: "",
        prenom: "",
        genre: "",
        email: "",
        dateNaissance: "",
        telephone: "",
        pratique: "",
        urgenceTelephone: "",
      },
      options: [
        "Compétition de manière régulière",
        "Compétition occasionnelle",
        "Entrainement",
        "Ne pratique pas",
      ],
      eventsRegistered: {},
      message : useMessage(),

    };
  },
  computed: {
    token() {
      return useStore().getters.getToken;
    },
  },
  mounted() {
    this.recupererProfil();
    this.afficherEvent();

  },
  methods: {
    toggleEditMode() {
      if (this.editMode) {
        this.sauvegarderProfil();
        this.editMode = false;
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
      const uri = "api/adherent";
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
        this.adherent = {
          numeroLicence: response.data.numeroLicence || "",
          nom: response.data.nom || "",
          prenom: response.data.prenom || "",
          genre: response.data.genre || "",
          email: response.data.email || "",
          dateNaissance: this.formatDate(response.data.dateNaissance) || "", // Utiliser formatDate ici
          telephone: response.data.telephone || "",
          pratique: response.data.pratique || "",
          urgenceTelephone: response.data.urgenceTelephone || "",
        };
      } catch (error) {
        this.message.error("Erreur lors de la récupération des données utilisateur :",error.message);
      }
    },

    async sauvegarderProfil() {
      const uri = "/api/adherent/update-adherent";
      try {

        if (!this.token) {
          throw new Error("Token d'authentification non disponible");
        }

        const response = await axios.put(uri, { adherent: this.adherent }, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!this.adherent.numeroLicence.trim()) {
          this.errorMessage = "Le numéro de licence doit être rempli.";
          return;
        }
        if (!this.adherent.nom.trim()) {
          this.errorMessage = "Le nom de l'adhérent doit être rempli.";
          return;
        }
        if (!this.adherent.prenom.trim()) {
          this.errorMessage = "Le prénom de l'adhérent doit être rempli.";
          return;
        }
        if (!this.adherent.genre.trim()) {
          this.errorMessage = "Le genre de l'adhérent doit être rempli.";
          return;
        }
        if (!this.adherent.email.trim()) {
          this.errorMessage = "L'adresse mail de l'adhérent doit être rempli.";
          return;
        }
        if (!this.adherent.dateNaissance) {
          this.errorMessage = "La date de naissance de l'adhérent doit être rempli.";
          return;
        }
        if (!this.adherent.telephone) {
          this.errorMessage = "Le numéro de téléphone de l'adhérent doit être rempli.";
          return;
        }
        if (!this.adherent.pratique.trim()) {
          this.errorMessage = "La pratique de l'adhérent doit être rempli.";
          return;
        }
        if (response.status === 200) {
          this.message.success = ("Profil mis à jour avec succès !")
        }
      } catch (error) {
        this.message.error("Erreur lors de la mise à jour du profil", error)
      }
    },
    async afficherEvent() {
      const uri = `/api/events/subscribe`;
      try {
        const token = this.$store.getters["getToken"];
        if (!token) {
          alert("Veuillez vous connecter pour voir les événements.");
          this.$router.push("/");
          return;
        }
        const response = await axios.get(uri, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log("Evenements ou l'user est inscrit:", response.data);
          this.eventsRegistered = response.data.events;
          console.log("Evenements ou l'user est inscrit sur la page profile:", this.eventsRegistered);

          console.log("taille",this.eventsRegistered.length);
        } else {
          console.error("Erreur de récupération :", response.status);
          this.$router.push("/");
        }
      } catch (err) {
        if (err.response) {
          this.message.error(err.response?.data.error || 'Une erreur est survenue.');
        } else if (err.request) {
          this.message.error('Problème de connexion. Veuillez réessayer plus tard.');
        } else {
          this.message.error('Une erreur inconnue est survenue.');
        }
      }
    },
    getPlaceholder(field) {
      const placeholders = {
        nom: "Nom",
        prenom: "Prénom",
        email: "Adresse Mail",
        telephone: "Téléphone",
        urgenceTelephone: "Numéro d'urgence",

      };
      return placeholders[field] || "";
    }
  },
};
</script>

<style scoped>
.titre {
  position: relative;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 8px 22px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #2C3E50; /* Bleu profond */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  z-index: 1000;
  letter-spacing: 1px;
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

/* Boutons Performances*/
.buttons-container {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 15px;
  margin-top: 50px;}

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
  margin-top: 60px;
  margin-bottom: 20px;
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


/* Bouton Valider en bas à droite */
.edit-button {
  grid-column: span 2; /* Étend sur toute la largeur */
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  justify-self: end;
}

.edit-button:hover {
  background-color: #0056b3;
}
.placeholder-style {
  color: gray;
  font-style: italic;
}

</style>

