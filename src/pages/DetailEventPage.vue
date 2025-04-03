<script>
import axios from 'axios';
import {defineComponent} from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  components: {HeaderComponent},
  props: ["eventId"],
  data() {
    return {
      isEditing: false,
      event: {
        eventId : null,
        dirigeantId : null,
        name: '',
        description: '',
        createdAt : '',
        endAt: '',
        participants : [],
      },
    };
  },
  async mounted() {
    await this.fetchEvent();
  },
  methods: {
    goToEdit() {
      if (!this.event || !this.event.eventId) {
        return;
      }
      this.$router.push({ name: "EditEventPage", params: { eventId: this.event.eventId } });
    },
    formatEventDate(dateString) {
      if (!dateString) return null; // Vérifie si la date est null
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async deleteEvent() {
      if (!confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
      try {
        const token = this.$store.getters["getToken"];
        if (!token) {
          alert("Veuillez vous connecter pour supprimer cet événement.");
          this.$router.push("/");
          return;
        }

        await axios.delete(`/api/events/${this.eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        alert("Événement supprimé !");
        this.$router.push("/users/EventPage");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    },
    async fetchEvent() {
      const uri = `/api/events/${this.eventId}`;
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
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log("Données récupérées :", response.data);
          this.event = response.data.event;
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
    <HeaderComponent/>
    <div class="main-container">
      <div class="principal-container">
        <div class="detail-event-container">
          <h2>Détail de l'évènement</h2>
          <div>
            <p><strong>Titre :</strong> {{ event.name }}</p>
            <p><strong>Date :</strong> {{ this.formatEventDate(event.endAt) }}</p>
            <p><strong>Description :</strong> {{ event.description }}</p>
            <button class="bouton" @click="goToEdit">Editer</button>
            <button class="bouton" @click="deleteEvent">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
    <footer>© 2025 - Site TTM | Auteur | Support</footer>
  </div>
</template>

<style scoped>

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

</style>
