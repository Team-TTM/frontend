<template>
  <div id="page-container">
    <header>
      <LogoTTM />
      <boutons-header />
    </header>
    <div class="main-container">
      <div class="principal-container">
        <div class="detail-event-container">
          <h2>Créer un évènement</h2>
          <div class="input-div">
            <p>Titre :</p>
            <input type="text" v-model="event.title" required />
            <p>Date :</p>
            <input type="date" v-model="event.registrationEndDate" required />
            <p>Description</p>
            <textarea v-model="event.description" required/>
            <div class="button-div">
              <button class="button" @click="createEvent">Créer</button>
            </div>
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
  width : 44vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.uploaded-preview-container {
  margin-top: 10px;
  border-radius: 10px;
  max-width: 300px;
}

.uploaded-preview {
  max-width: 100%;
  border-radius: 10px;
}

.description-container{
  width:50%;
}

.description-container textarea {
  resize: none;
}

.button{
  width :6vw;
  height: 4vh;
  cursor: pointer;
  border: none;
  border-radius : 10px;
  background-color: #b52b1d;
  color:#ffffff;
  font-size: 11px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  transition-duration: 0.4s;
  text-align : center;
  text-transform: uppercase;
  margin: 10px;
}

.button:hover{
  background-color: #ffffff;
  color:#b52b1d;
  box-shadow : 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.input-div{
  display:flex;
  flex-grow: 1;
  flex-direction: column;
  align-content: center;
}
</style>

<script>
import axios from 'axios';
import BoutonsHeader from "@/components/boutonsHeader.vue";
import LogoTTM from "@/components/LogoTTM.vue";

export default {
  components: {LogoTTM, BoutonsHeader},
  data() {
    return {
      event: {
        title: '',
        description: "",
        registrationEndDate: ''
      }
    };
  },
  methods:{
    async createEvent(){
      const uri = "/api/events";
      try {
        const token = this.$store.getters['getToken'];
        console.log("Token récupéré du store: ", token);

        if (!token) {
          alert('Vous devez être connecté pour créer un événement.');
          return;
        }

        const eventData = {
          event:{
            name: this.event.title,
            description: this.event.description,
            endAt: this.event.registrationEndDate,
            dirigeantId: null,
            createdAT: null,
            participants: []
          }
        };

        console.log("Données envoyées :", eventData);

        await axios.post(
          uri,
          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        alert('Évènement créé avec succès !');

      } catch (error) {
        console.error('Erreur:', error.response ? error.response.data : error.message);
        alert("Erreur lors de la création de l'événement.");
      }
    }
  }
};
</script>


