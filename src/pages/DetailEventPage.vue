<script>
import axios from 'axios';
import {defineComponent} from "vue";
import {useMessage} from "naive-ui";

export default defineComponent({
  props: ["eventId"],
  data() {
    return {
      isEditing: false,
      isSubscribed: false,
      event: {
        eventId : null,
        dirigeantId : null,
        name: '',
        description: '',
        createdAt : '',
        endAt: '',
        participants : [],
        type : '',
        nombreMax : null,
        lieu : ''
      },
      message : useMessage(),
      eventsRegistered: [],
    };
  },
  async mounted() {
    await this.fetchEvent();
    await this.checkSubscription();

  },
  methods: {
    goToEdit() {
      if (!this.event || !this.event.eventId) {
        return;
      }
      this.$router.push({
        name: "EditEventPage",
        params: { eventId: this.event.eventId },
        state: { event: this.event }
      });
    },
    async deleteEvent() {
      if (!confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
      try {
        const token = this.$store.getters["getToken"];
        if (!token) {
          this.message.error("Veuillez vous connecter pour supprimer cet événement.")
          this.$router.push("/");
          return;
        }

        await axios.delete(`/api/events/${this.eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.message.success("Vous avez supprimé l'évènement !");
        this.$router.push("/users/EventPage");
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
    async fetchEvent() {
      const uri = `/api/events/${this.eventId}`;
      try {
        const token = this.$store.getters["getToken"];
        if (!token) {
          alert("Veuillez vous connecter pouvoir acceder à vos événements.");
          this.$router.push("/");
          return;
        }

        const response = await axios.get(uri, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.event = response.data.event;

          if (this.event.endAt) {
            const endDate = new Date(this.event.endAt);
            this.event.endAt = this.formatDate(endDate); // Format string affiché
          }

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
    async checkSubscription() {
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
          this.isSubscribed = this.eventsRegistered.some(event => Number(event.eventId) === Number(this.eventId));
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
    async subscribeEvent() {
      const uri = `/api/events/subscribe/${this.eventId}`;
      try {
        const token = this.$store.getters["getToken"];
        console.log("token",token);
        if (!token) {
          alert("Veuillez vous connecter pour vous inscrire à un evenement.");
          this.$router.push("/");
          return;
        }

        const response = await axios.post(uri,{},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.status);
        console.log("reponse", response.data)
        if (response.status === 200) {
          this.isSubscribed = true;
          this.message.success("Vous êtes inscrit à cet évènement");

        } else {
          console.error("Erreur de récupération :", response.status);
          this.$router.push("/");
        }
      } catch (error) {
        if (error.response) {
          this.message.error(error.response?.data.error || 'Une erreur est survenue.');
        } else if (error.request) {
          this.message.error('Problème de connexion. Veuillez réessayer plus tard.');
        } else {

          this.message.error('Une erreur inconnue est survenue.');
        }
      }
    },
    async unsubscribeEvent() {
      if (!confirm("Voulez-vous vraiment vous désinscrire ?")) return;
      try {
        const token = this.$store.getters["getToken"];
        if (!token) {
          alert("Veuillez vous connecter pour vous désinscrire.");
          this.$router.push("/");
          return;
        }

        await axios.delete(`/api/events/unsubscribe/${this.eventId}`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        this.isSubscribed = false;
        this.message.success("Vous n'etes plus inscrit à l'evenement");;
        this.$router.push("/users/EventPage");
      } catch (error) {
        if(error.response.status === 409) {
          console.error("Erreur lors de la désinscription :", error);
          this.message.warning("Vous etes deja désinscrit ")
        }
      }
    },

    getRole() {
      return this.$store.getters["getRole"];
    }

  },
});
</script>

<template>
  <div id="page-container">
    <div class="main-container">
      <div class="principal-container">
        <div class="detail-event-container">
          <h2>Détail de l'évènement</h2>
          <div>
            <p><strong>Titre :</strong> {{ event.name }}</p>
            <p><strong>Date de l'évènement :</strong> {{ event.endAt }}</p>
            <p><strong>Description :</strong> {{ event.description }}</p>
            <p><strong>Type d'évènement :</strong> {{ event.type }}</p>
            <p><strong>Nombre maximum : </strong> {{ event.nombreMax}}</p>
            <p><strong>Participants : </strong> {{event.participants}}</p>
            <p><strong>Lieu :</strong> {{ event.lieu }}</p>
              <button v-if="getRole() === 'dirigeant'" class="bouton" @click="goToEdit">Editer</button>
              <button v-if="getRole() === 'dirigeant'" class="bouton" @click="deleteEvent">Supprimer</button>
            <button v-if="getRole() === 'user'" class="bouton" @click="isSubscribed ? unsubscribeEvent() : subscribeEvent()">
              {{ isSubscribed ? "Se désinscrire" : "Participer" }}
            </button>

          </div>
        </div>
      </div>
    </div>
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
