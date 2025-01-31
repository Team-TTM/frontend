<template>
  <div>
    <!-- Configuration du bouton Facebook -->
    <div
      id="fb-root"
      :data-app_id="appId"
      :data-login_uri="loginUri">
    </div>

    <!-- Bouton Facebook -->
    <button @click="loginWithFacebook" class="facebook-button">
      <img width="40" height="40" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new"/>
      <span>Se connecter avec Google</span>
    </button>

    <!-- Affichage des informations utilisateur après connexion -->
    <div v-if="user">
      <p>Bienvenue, {{ user.name }} !</p>
      <img :src="user.picture" alt="Photo de profil" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appId: "1157899132711606", // Remplacez par votre Facebook App ID
      loginUri: "http://localhost:3000/users/auth/facebook", // Endpoint backend pour validation
      user: null, // Informations de l'utilisateur
    };
  },
  mounted() {
    // Charger dynamiquement le SDK Facebook si ce n'est pas encore fait
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.onload = this.initializeFacebookSDK;
      document.head.appendChild(script);
    } else {
      this.initializeFacebookSDK();
    }
  },
  methods: {
    initializeFacebookSDK() {
      window.fbAsyncInit = () => {
        FB.init({
          appId: this.appId,
          cookie: true,
          xfbml: true,
          version: "v12.0", // Version compatible de l'API Graph
        });
      };
    },
    loginWithFacebook() {
      FB.login(
        (response) => {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            this.fetchUserInfo(accessToken);
          } else {
            console.error("Connexion annulée ou non autorisée.");
          }
        },
        { scope: "public_profile,email" }
      );
    },
    fetchUserInfo(accessToken) {
      FB.api("/me", { fields: "name,email,picture" }, (response) => {
        if (response && !response.error) {
          this.user = {
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
          };

          // Optionnel : envoyer le token au backend pour validation
          this.sendTokenToServer(accessToken);
        } else {
          console.error("Erreur lors de la récupération des données utilisateur :", response.error);
        }
      });
    },
    sendTokenToServer(accessToken) {
      fetch(this.loginUri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: accessToken, // Envoyer le token au backend
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Réponse du serveur :", data);
        })
        .catch((error) => {
          console.error("Erreur lors de la communication avec le backend :", error);
        });
    },
  },
};
</script>

<style scoped>


.facebook-button {
  display: flex; /* Utilisation de Flexbox */
  align-items: center;     /* Centre verticalement */
  justify-content: space-around; /* Centre horizontalement */
  text-align: center;      /* Centre le texte (utile si le texte est sur plusieurs lignes) */
  background-color: #039be5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  height: 50px;
  width: 300px; /* Ajuste la largeur au texte */
  min-width: 200px;   /* Assure un minimum de largeur */
}
.facebook-button:hover {
  background-color: #0374e5;
}
</style>
