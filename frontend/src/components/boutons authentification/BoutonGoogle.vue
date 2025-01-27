<template>
  <div>
    <!-- Configuration du bouton Google -->
    <div
      id="g_id_onload"
      :data-client_id="clientId"
      data-context="signin"
      data-ux_mode="popup"
      :data-login_uri="loginUri"
      data-auto_prompt="false">
    </div>

    <!-- Bouton Google -->
    <div class="g_id_signin"
         data-type="standard"
         data-shape="rectangular"
         data-theme="filled_blue"
         data-text="signin_with"
         data-size="large"
         data-logo_alignment="left">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clientId: "758592485171-8s2snaqkej804kfe3pt2sifnuvfs5j9o.apps.googleusercontent.com",
      loginUri: "http://localhost:3000/users/auth/google"
    };
  },
  mounted() {
    // Charger dynamiquement le script Google si ce n'est pas encore fait
    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }
};
</script>
