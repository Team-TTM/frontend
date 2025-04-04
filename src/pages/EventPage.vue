<script>
import axios from "axios";
import {defineComponent} from "vue";
import {userRole} from "@/enums/userRole.js";

export default defineComponent({
  computed: {
    userRole() {
      return userRole
    }
  },
  data() {
    return {
      events: [],
    };
  },
  async mounted() {
    await this.fetchEvents();
  },
  methods: {
    getRole() {
      return this.$store.getters["getRole"];
    },
    goToDetail(event) {
      if (!event || !event.eventId) {
        return;
      }
      this.$router.push({ name: "DetailEventPage", params: { eventId: event.eventId } });
    },
    formatDate(date) {
      if (!date) return null;

      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    async fetchEvents() {
      const uri = "/api/events";
      const token = this.$store.getters['getToken'];

      try {
        if (!token) {
          this.$router.push("/");
          return;
        }

        const response = await axios.get(uri, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const eventsWithModifiedDates = response.data.events.map(event => {
            const modifiedEvent = { ...event };
            const originalDate = new Date(modifiedEvent.endAt);

            // 🔁 Utilise la méthode formatDate pour formater la date
            modifiedEvent.endAt = this.formatDate(originalDate);

            return modifiedEvent;
          });

          this.events = eventsWithModifiedDates;
        } else {
          console.error("Erreur de récupération :", response.status);
          this.$router.push("/");
        }
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    },
  },
});
</script>

<template>
  <div id="page-container">
    <div class="main-container">
      <div class="principal-container">
        <h2>Liste des événements</h2>
        <router-link v-if="getRole() !== userRole.USER" id="bouton" to="/users/CreateEventPage">
          Créer un évènement
        </router-link>
        <div v-if="events.length === 0">
          <p>Aucun événement disponible.</p>
        </div>
        <div class="event-container">
          <div v-for="event in events" :key="event.eventId" class="event-item" @click="goToDetail(event)">
            <h3>{{ event.name }}</h3>
            <p><strong>Date de l'évènement :<br> </strong> {{ event.endAt }}</p>
            <p><strong>Description : <br></strong>{{ event.description }}</p>
            <p><strong>Type : </strong>{{ event.type }}</p>
            <p><strong>Nombre maximum : </strong>{{ event.nombreMax }}</p>
            <p><strong>Lieu : </strong>{{ event.lieu }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.principal-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  justify-content: start;
  align-items: start;
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

.event-container {
  display: flex;
  flex-direction: column; /* Changez ici de 'row' à 'column' pour un affichage vertical */
  width: 100%; /* Assurez-vous que le conteneur prend toute la largeur */
  margin: 10px 0; /* Ajout d'un peu d'espace autour du conteneur */
  gap: 15px; /* Espacement entre les éléments */
  padding: 10px;
}
.event-item {
  cursor : pointer;
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  background-color: #f9f9f9;
}

.event-item:hover{
  background : #FAACAD;
  transition-duration: 0.4s;
}

#bouton{
  position:relative;
  min-width :15vw;
  height: 7.5vh;
  cursor: pointer;
  border: none;
  border-radius : 10px;
  background-color: #b52b1d;
  color:#ffffff;
  font-weight: bold;
  font-size: 11px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  transition-duration: 0.4s;
  text-align : center;
  text-transform: uppercase;
  margin: 10px;
  display: flex;
  justify-content: center; /* Centre horizontalement */
  align-items: center;
  text-decoration: none;
}

#bouton:hover{
  background-color: #ffffff;
  color:#b52b1d;
  box-shadow : 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>
