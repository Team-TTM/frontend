<script>
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      events: [],
    };
  },
  async mounted() {
    await this.fetchEvents();
  },
  methods: {
    goToDetail(event) {
      if (!event || !event.eventId) {
        return;
      }
      this.$router.push({ name: "DetailEventPage", params: { eventId: event.eventId } });
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
          this.events = response.data.events;
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
        <router-link to="/users/CreateEventPage">
          <button class="button">Créer un évènement</button>
        </router-link>
        <div v-if="events.length === 0">
          <p>Aucun événement disponible.</p>
        </div>
        <div class="event-container">
          <div v-for="event in events" :key="event.eventId" class="event-item" @click="goToDetail(event)">
            <h3>{{ event.name }}</h3>
            <p><strong>Date de fin d'inscription :</strong> {{ event.end_at }}</p>
            <p><strong>Description :<br></strong>{{ event.description }}</p>
            <p><strong>Participants :</strong>{{ event.participants }}</p>
            <p><strong>Type :</strong>{{ event.type }}</p>
            <p><strong>Nombre maximum :</strong>{{ event.nombreMax }}</p>
            <p><strong>Lieu :</strong>{{ event.lieu }}</p>
          </div>
        </div>
      </div>
    </div>
    <footer>© 2025 - Site TTM | Auteur | Support</footer>
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

.button {
  background-color: #b52b1d;
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.button:hover {
  background-color: #ffffff;
  color: #b52b1d;
  border: 1px solid #b52b1d;
}
</style>
