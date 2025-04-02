<template>
    <LogoTTM/>
  <div class="container-connexion">
    <n-card id="card" title="Authentification">
      <n-space vertical>
        <n-button class="btn" size="large" @click="loginWithGoogle">
          Continuer avec Google
          <template #icon>
            <n-icon>
              <Google/>
            </n-icon>
          </template>
        </n-button>
        <n-button class="btn" size="large" @click="loginWithFacebook">
          Continuer avec Facebook
          <template #icon>
            <n-icon>
              <Facebook/>
            </n-icon>
          </template>
        </n-button>
        <n-button class="btn" size="large" @click="signIn">Se connecter
          <template #icon>
            <n-icon>
              <Mail/>
            </n-icon>
          </template>
        </n-button>
      </n-space>
      <n-divider/>
      <n-button align="center" class="btn" size="large" @click="signUp">
        S'inscrire
        <template #icon>
          <n-icon>
            <Mail/>
          </n-icon>
        </template>
      </n-button>
    </n-card>
  </div>
</template>


<script setup>
import LogoTTM from '@/components/LogoTTM.vue';
import {LogoGoogle as Google} from '@vicons/ionicons5'
import {FacebookF as Facebook} from '@vicons/fa'
import {EmailFilled as Mail} from '@vicons/material'
import {useRouter} from 'vue-router';
import {useLoadingBar} from 'naive-ui'
import {onMounted} from 'vue'

const loadingBar = useLoadingBar()
const router = useRouter();

onMounted(() => {
  loadingBar.finish();
});

const loginWithFacebook = () => {
  window.location.href = '/users/auth/facebook';
}

const loginWithGoogle = () => {
  window.location.href = '/users/auth/google';
};

const signIn = async () => {
  await router.push({name: 'Connexion'});
};
const signUp = async () => {
  await router.push({name: 'Inscription'});
};
</script>

<style scoped>

.container-connexion {
  background: #F0F0F0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

#card {
  height: 600px;
  width: 600px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.container-btn {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#form-connexion {
  background: #dddddd;
  border-radius: 5px;
  width: 100%;
  padding: 20px;
  max-width: 500px;
  min-width: 300px;
  margin: auto 20px;
}

.btn {
  display: flex;
  justify-content: flex-start;
  background: white;
  width: 250px
}
</style>
