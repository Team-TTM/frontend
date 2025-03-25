<template>
  <div id="page-container">
    <header>
      <LogoTTM />
      <boutons-header />
    </header>
    <div class="main-container">
      <div class="principal-container">
        <div class="info-event-container">
          <h2>Créer un évènement</h2>
            <div class="input-div">
              <p>Titre :</p>
              <input type="text" v-model="event.name" required />
              <p>Date :</p>
              <input type="date" v-model="event.endAt" required />
              <p>Description</p>
              <textarea rows="10" cols="30" v-model="event.description" required />
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  font-weight: bold;
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

.info-event-container{
  display : flex;
  width : 44vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button{
  width :6vw;
  height: 4vh;
  cursor: pointer;
  border: none;
  border-radius : 10px;
  background-color: #b52b1d;
  color:#ffffff;
  font-size: 10px;
  font-weight: bold;
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
        name: '',
        description: "",
        endAt: null,
      },
      errorMessage : "",
    };
  },
  methods:{
    async createEvent(){
      const uri = "/api/events";
      this.errorMessage = "";
      try {
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



        const eventData = {
          event:{
            name: this.event.name,
            description: this.event.description,
            endAt: this.event.endAt,
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
        this.$router.push({name:"EventPage"});

      } catch (error) {
        this.errorMessage = error.response
            ? error.response.data.error || "Une erreur est survenue."
            : error.message;
        console.error("Erreur:", this.errorMessage);
      }
    }
  }
};
</script>


