<template>
  <div>
    <button class="evenement">Évènement</button>
    <button class="club">Le club</button>
    <button class="entrainement">Entraînement</button>
    <button class="stage">Stage</button>
  </div>


</template>

<script setup>

</script>

<style scoped>

div{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: lightgrey;
  height: 10vh;
  width: 175vh;
  padding : 1em;
  margin : 1em;

}

button{
  width: 5vw;
  height: 7.5vh;
  cursor: pointer;
  border: solid #b52b1d 1.5px;
  border-radius : 10px;
  background-color: #b52b1d;
  font-weight: bold;
  transition-duration: 0.4s;
  color:#ffffff;
  margin-right: 15px;
}

button:hover{
  background-color: #cd3324;
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
