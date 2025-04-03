<template>
  <div id="page-container">
    <div class="main-container">
      <div class="principal-container">
        <n-form class="info-event-container" :model="event" @submit.prevent="createEvent">
          <h2>Créer un évènement</h2>

          <div class="input-div">
            <p>Nom de l'évènement :</p>
            <n-input v-model:value="event.name" clearable style="width: 100%" placeholder="Entrez le nom" />

            <p>Date de fin d'inscription :</p>
            <n-date-picker v-model:value="event.endAt" type="date" placeholder="Sélectionnez une date" style="width: 100%" />

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

            <div>
              <n-button type="primary" @click="createEvent">Créer</n-button>
            </div>
          </div>
        </n-form>
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
  height: 65vh;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px 24px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow-y: auto;
}

.info-event-container {
  display: flex;
  max-width: 100%;
  width: 44vw;
  flex-direction: column;
  align-items: center;
  overflow-x: auto;
}

</style>

<script>
import axios from "axios";
import { useMessage } from "naive-ui";

export default {
  data() {
    return {
      event: {
        eventId: null,
        dirigeantId: null,
        name: "",
        description: "",
        createdAt: "",
        endAt: null,
        participants: [],
        type: "",
        nombreMax: null,
        lieu: "",
      },
      types: [
        { label: "Course", value: "Course" },
        { label: "Déplacement", value: "Déplacement" },
        { label: "Soirée", value: "Soirée" },
        { label: "Stage", value: "Stage" },
      ],
      errorMessage: "",
      message: useMessage(),
    };
  },
  methods: {
    async createEvent() {
      this.errorMessage = "";
      const token = this.$store.getters["getToken"];

      if (!token) {
        this.errorMessage = "Vous devez être connecté pour créer un évènement.";
        return;
      }

      const requiredFields = [
        { value: this.event.name, message: "Le nom de l'évènement doit être rempli." },
        { value: this.event.endAt, message: "La date de fin d'inscription doit être remplie." },
        { value: this.event.description, message: "La description doit être remplie." },
        { value: this.event.type, message: "Le type de l'évènement doit être rempli." },
        { value: this.event.nombreMax, message: "Le nombre maximum de participants doit être rempli." },
        { value: this.event.lieu, message: "Le lieu de l'évènement doit être rempli." },
      ];

      for (const field of requiredFields) {
        if (!field.value || (typeof field.value === "string" && !field.value.trim())) {
          this.errorMessage = field.message;
          return;
        }
      }

      try {
        const response = await axios.post("/api/events", { event: this.event }, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });

        console.log("response statut", response.status);

        if (response.status === 201) {
          this.message.success("Évènement créé avec succès !");
          this.$router.push({ name: "EventPage" });
        } else {
          this.message.error(response.data.message || "Une erreur est survenue.");
        }
      } catch (err) {
        this.message.error(
            err.response?.data.error || err.request ? "Problème de connexion." : "Une erreur inconnue est survenue."
        );
      }
    },
  },
};
</script>
