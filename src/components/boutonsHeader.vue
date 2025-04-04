<template>
    <nav class="container-buttons">
        <router-link class=button-link to="/users/EventPage">
            Évènement
    </router-link>
        <router-link class=button-link to="/users/ClubPage">
            Le club
    </router-link>
        <router-link class=button-link to="/users/EntrainementPage">
            Entraînement
    </router-link>
        <router-link class=button-link to="/users/StagePage">
            Stage
    </router-link>
    </nav>
</template>

<script setup>

</script>

<style scoped>

.container-buttons{
    flex: 1;
  display: flex;
    justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
    height: 100%;
    max-width: 1000px;
  padding : 1em;
  border:none;
  border-radius: 10px;
    gap: 10px;
}

.button-link {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 75px;
  cursor: pointer;
  border: none;
  border-radius : 10px;
  background-color: #b52b1d;
  color:#ffffff;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  transition-duration: 0.4s;
  text-align : center;
  text-transform: uppercase;
    text-decoration: none;
}

.button-link:hover {
  background-color: #ffffff;
  color:#b52b1d;
  box-shadow : 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

</style>
