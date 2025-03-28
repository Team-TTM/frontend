<template>
  <header>
    <LogoTTM/>
  </header>
  <div class="container-connexion">
    <n-space id="form-connexion" align="center" vertical>
      <h1> Bienvenue</h1>
      <n-divider/>
      <n-button class="btn" size="large" @click="loginWithGoogle">Continuer avec Google
        <template #icon>
          <n-icon>
            <Google/>
          </n-icon>
        </template>
      </n-button>
      <n-button class="btn" size="large" @click="loginWithFacebook"> Continuer avec Facebook
        <template #icon>
          <n-icon>
            <Facebook/>
          </n-icon>
        </template>
      </n-button>
      <n-divider/>
      <n-button class="btn" size="large" @click="signIn">Se connecter
        <template #icon>
          <n-icon>
            <Mail/>
          </n-icon>
        </template>
      </n-button>
      <n-divider/>
      <n-button class="btn" size="large" @click="signUp">
        S'inscrire
        <template #icon>
          <n-icon>
            <Mail/>
          </n-icon>
        </template>
      </n-button>
    </n-space>
  </div>
</template>


<script setup>
import LogoTTM from '@/components/LogoTTM.vue';
import {LogoGoogle as Google} from '@vicons/ionicons5'
import {FacebookF as Facebook} from '@vicons/fa'
import {EmailFilled as Mail} from '@vicons/material'
import {useRouter} from 'vue-router';

const router = useRouter();

const loginWithFacebook = () => {
  window.location.href = '/users/auth/facebook';
}

const loginWithGoogle = () => {
  window.location.href = '/users/auth/google';
};

const signIn = async () => {
  await router.push('/users/connexion');
};
const signUp = async () => {
  await router.push('/users/inscription');
};
</script>

<style scoped>

.container-connexion {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
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
  background: white;
  width: 300px
}
</style>
