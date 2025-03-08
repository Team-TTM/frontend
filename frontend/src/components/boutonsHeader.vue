<template>
  <div class="container-buttons">
    <router-link to="/users/EventPage">
      <button class="evenement">Évènement</button>
    </router-link>
    <router-link to="/users/ClubPage">
      <button class="club">Le club</button>
    </router-link>
    <router-link to="/users/EntrainementPage">
    <button class="entrainement">Entraînement</button>
    </router-link>
    <router-link to="/users/StagePage">
    <button class="stage">Stage</button>
    </router-link>

  </div>
</template>

<script setup>

</script>

<style scoped>

.container-buttons{
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  height: 10vh;
  width: 175vh;
  padding : 1em;
  margin-right: 110px;
  border:none;
  border-radius: 10px;
}

button{
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
}

button:hover{
  background-color: #ffffff;
  color:#b52b1d;
  box-shadow : 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.evenement{
  flex: 1 1 auto;
}
.club{
  flex: 1 1 auto;
}
.entrainement{
  flex: 1 1 auto;
}
.stage{
   flex: 1 1 auto;
}

</style>
