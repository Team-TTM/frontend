<template>
  <div class="container-connexion">
    <n-card id="card" title="Authentification">
      <n-space vertical>
        <n-button :theme-overrides="{
                textColorHover: '#ff5733',
                borderHover: '1px solid #ff5733',
                backgroundColorHover: '#ffeeee'
                 }" class="btn" size="large"
                  @click="loginWithGoogle">
          Continuer avec Google
          <template #icon>
            <n-icon>
              <Google/>
            </n-icon>
          </template>
        </n-button>
        <n-button :theme-overrides="{
                textColorHover: '#1877F2',
                borderHover: '1px solid #1877F2',
                backgroundColorHover: '#1877F2'
                 }" class="btn" size="large"
                  @click="loginWithFacebook">
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


#card {
  background: #ffffff;
  width: 600px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.btn {
  display: flex;
  justify-content: flex-start;
  background: white;
  width: 300px;
  height: 75px;
}
</style>
