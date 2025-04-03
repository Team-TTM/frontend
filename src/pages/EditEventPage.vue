<script>

import axios from 'axios';
import {defineComponent} from "vue";
import {useMessage} from 'naive-ui';

export default defineComponent({
  props: ["eventId"],
  data() {
    return {
      event: {
        eventId : null,
        dirigeantId : null,
        name: '',
        description: '',
        createdAt : null,
        endAt: null,
        type : '',
        nombreMax : null,
        lieu : ''
      },
      types : [
        {
          label: 'Course',
          value: 'Course',
        },
        {
          label: 'Déplacement',
          value: 'Déplacement',
        },
        {
          label: 'Soirée',
          value: 'Soirée',
        },
        {
          label: 'Stage',
          value: 'Stage',
        },
        {
          label: 'Entrainement',
          value: 'Entrainement',
        }
      ],
      errorMessage : "",
      message: useMessage()
    };
  },
  async mounted(){
    const eventId = this.$route.params.eventId;
    if (eventId) {
      await this.fetchEvent();
    } else {
      console.error("L'eventId est manquant dans les paramètres de la route.");
    }
  },
  methods: {
    cancelEditing(){
      this.$router.push({name:"EventPage"})
    },
    formatEventDate(dateString) {
      if (!dateString) return null; // Vérifie si la date est null
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async fetchEvent() {
      const token = this.$store.getters['getToken'];
      const eventId = this.$route.params.eventId;

      try {
        if (!token || !eventId) {
          this.$router.push("/");
          return;
        }

        const response = await axios.get(`/api/events/${this.eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          this.event = response.data;
        } else {
          console.error("Erreur de récupération :", response.status);
          this.$router.push("/");
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'événement :", error);
      }
    },
    async saveChanges(){
      const uri = "/api/events";
      this.errorMessage = "";
      try{
        const token = this.$store.getters['getToken'];
        console.log("Token récupéré du store: ", token);

        if (!token) {
          return;
        }

        if (!this.event.name.trim()) {
          this.errorMessage = "Le nom de l'évènement doit être rempli.";
          return;
        }

        if(!this.event.endAt){
          this.errorMessage = "La date de fin d'inscription doit être remplie.";
          return;
        }

        if(!this.event.description.trim()){
          this.errorMessage = "La description doit être remplie.";
          return;
        }

        if(!this.event.type.trim()){
          this.errorMessage = "Le type de l'évènement doit être rempli";
          return;
        }

        if(!this.event.nombreMax){
          this.errorMessage = "Le nombre maximum de participants doit être rempli";
          return;
        }

        if(!this.event.lieu.trim()){
          this.errorMessage = "Le lieu de l'évènement doit être rempli";
          return;
        }

        const rawEventId = this.$route.params.eventId;
        this.event.eventId = parseInt(rawEventId, 10);

        const localDate = this.event.endAt.toLocaleString("fr-FR", { timeZone: "Europe/Paris" })

        const eventData = {
          event:{
            eventId: this.event.eventId,
            name: this.event.name,
            description: this.event.description,
            endAt: localDate,
            type: this.event.type,
            nombreMax: this.event.nombreMax,
            lieu: this.event.lieu
          }
        };

        console.log("Date envoyée", eventData.event.endAt);

        console.log("Données envoyées :", eventData);

        await axios.put(
          uri,
          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":"application/json"
            }
          }
        );

        alert('Évènement modifié avec succès !');
        this.$router.push({name: "EventPage"});

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
  },
});
</script>

<template>
<div id="page-container">
  <div class="main-container">
    <div class="principal-container">
      <n-form class="detail-event-container" :model="event" @submit.prevent="saveChanges">
        <h2>Editer l'évènement </h2>
        <div class="input-div">
          <p>Nom de l'évènement :</p>
          <n-input v-model:value="event.name" clearable style="width: 100%" placeholder="Entrez le nom" />

          <p>Date de fin d'inscription :</p>
          <n-date-picker
            v-model:formatted-value="event.endAt"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            clearable
          />

          <p>Description :</p>
          <n-input
            v-model:value="event.description"
            clearable
            type="textarea"
            placeholder="Entrez la description"
            size="large"
            :autosize="{ minRows: 3, maxRows: 5 }"
            style="width: 100%"
          />

          <p>Type d'évènement :</p>
          <n-select v-model:value="event.type" :options="types" style="width: 100%" placeholder="Choisissez un type" />

          <p>Nombre maximum de participants :</p>
          <n-input-number v-model:value="event.nombreMax" placeholder="Entrer le nombre maximum" :min="1" style="width: 100%" />

          <p>Lieu :</p>
          <n-input v-model:value="event.lieu" placeholder="Entrer le lieu" clearable style="width: 100%" />

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

          <div class="div-buttons-container">
            <div class="div-button-save">
              <n-button :theme-overrides="{
                  textColorHover: '#ff5733',
                  borderHover: '1px solid #ff5733',
                  backgroundColorHover: '#ffeeee'
                   }" class="btn" @click="saveChanges">
                Enregistrer
              </n-button>
            </div>
            <div class="div-button-cancel">
              <n-button :theme-overrides="{
              textColorHover: '#ff5733',
              borderHover: '1px solid #ff5733',
              backgroundColorHover: '#ffeeee'
              }" class="btn" @click="cancelEditing">
                Annuler
              </n-button>
            </div>
          </div>
        </div>
      </n-form>
    </div>
  <footer>© 2025 - Site TTM | Auteur | Support</footer>
</div>
</div>
</template>

<style scoped>

.btn {
  display: flex;
  justify-content: center;
  background: white;
}

.div-buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
}

.div-button-save{
  display: flex;
}
.div-button-cancel{
  display: flex;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  font-weight: bold;
}

.bouton{
  width : fit-content;
  height: 4vh;
  cursor: pointer;
  border: none;
  border-radius : 10px;
  background-color: #b52b1d;
  color:#ffffff;
  font-size: min(5vw, 16px);
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  transition-duration: 0.4s;
  text-align : center;
  text-transform: uppercase;
  margin: 10px;
}

.bouton:hover{
  background-color: #ffffff;
  color:#b52b1d;
  box-shadow : 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.principal-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65vh; /* Hauteur fixe, ajustable selon vos besoins */
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px 24px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  font-size: 18px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  overflow-y: auto; /* Permet un défilement vertical si le contenu dépasse */
}

.detail-event-container{
  display : flex;
  max-width: 100%;
  width : 44vw;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-x: auto;
}

.input-container{
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin : 10px;
}

</style>
