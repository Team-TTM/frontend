<script>

import axios from 'axios';
import {defineComponent} from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  components: {HeaderComponent},
  props: ["eventId"],
  data() {
    return {
       event: {
        eventId : null,
        dirigeantId : null,
        name: '',
        description: '',
        createdAt : '',
        endAt: '',
        participants : [],
      },
      errorMessage : "",
    };
  },
  mounted(){
    this.fetchEvent();
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
      try {
        const eventId = this.$route.params.eventId;
        const token = this.$store.getters["getToken"];

        if (!eventId || !token) return;

        const response = await axios.get(`/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.event = response.data;
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

        const rawEventId = this.$route.params.eventId;
        this.event.eventId = parseInt(rawEventId, 10);

        const eventData = {
          event:{
            eventId: this.event.eventId,
            name: this.event.name,
            description: this.event.description,
            endAt: this.event.endAt,
          }
        };

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

      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.error || "Une erreur est survenue."
          : error.message;
      }
    },
  },
});
</script>

<template>
<div id="page-container">
  <div class="main-container">
    <div class="principal-container">
      <div class="detail-event-container">
        <h2>Détail de l'évènement</h2>
        <div class="input-container">
          <p>Nom de l'évènement : </p>
          <input v-model="event.name" title="Nom de l'évènement">
          <p>Date de fin d'inscription : </p>
          <input v-model="event.endAt" type="date" title="Date de fin d'inscription" >
          <p>Description : </p>
          <textarea rows="10" cols="30" v-model="event.description" title="Description"/>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <button class="bouton" @click="saveChanges">Enregistrer</button>
          <button class="bouton" @click="cancelEditing">Annuler</button>
        </div>
      </div>
    </div>
  <footer>© 2025 - Site TTM | Auteur | Support</footer>
</div>
</div>
</template>

<style scoped>

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
  flex-wrap: wrap;
  width : 44vw;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.input-container{
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin : 10px;
}

</style>
