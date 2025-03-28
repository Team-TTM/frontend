<template>
  <header>
    <LogoTTM/>
  </header>
  <div class="container-connexion">
    <n-form id="form-connexion" ref="formRef" :model="model" :rules="rules">
      <h1>Se connecter </h1>
      <n-form-item label="Mail" path="mail">
        <n-input
          v-model:value="model.mail"
          autocomplete="email"
          placeholder="Taper ici votre mail"
          type="text"
          @keydown.enter.prevent/>
      </n-form-item>
      <n-form-item label="Mot de passe" path="password">
        <n-input
          v-model:value="model.password"
          autocomplete="new-password"
          placeholder="Taper ici votre mot de passe"
          showPasswordOn="click"
          type="password"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              :disabled="formRef?.value?.validate() "
              type="primary"
              @click="handleValidateButtonClick"
            >
              Validate
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script setup>
import {useMessage} from 'naive-ui';
import {ref} from 'vue';
import {useLoadingBar} from 'naive-ui'
import axios from 'axios';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {userRole} from '@/enums/userRole.js';
import LogoTTM from '@/components/LogoTTM.vue';

const router = useRouter();

const store = useStore();
const loadingBar = useLoadingBar()
const formRef = ref(null);
const rPasswordFormItemRef = ref(null);
const message = useMessage();
const model = ref({
  mail: null,
  password: null,
});

const rules = {
  mail: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('L\'email est requise')
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          return new Error('L\'email est invalide')
        }
        return true;
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: 'Le mot de passe est requis'
    },
    {
      validator: (rule, value) => {
        const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,64}$/;
        if (!value) {
          return new Error('Le mot de passe est requis');
        }
        if (!passwordPattern.test(value)) {
          return new Error('Le mot de passe doit contenir entre 7 et 64 caractères, avec au moins un chiffre et un symbole spécial');
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
  ],
};

function getFormData() {
  return {
    mail: model.value.mail,
    password: model.value.password,
  }
}

function handlePasswordInput() {
  if (model.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({trigger: 'password-input'});
  }
}

function handleValidateButtonClick(e) {
  const url = '/api/auth/sign-in';
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (errors) {
      message.error('remplir tout les champs');
    } else {
      loadingBar.start()
      try {
        const response = await axios.post(url, getFormData());
        if (response.status === 200) {
          const authHeader = response.headers.authorization;
          const token = authHeader.split(' ')[1];
          store.dispatch('login', token);
          await store.dispatch('login', userRole.USER);
          console.log(response.data);
          await router.push('HomePage');
        } else {
          loadingBar.error();
          message.error(response.data.message);
        }
      } catch (err) {
        if (err.response) {
          message.error(err.response?.data.error || 'Une erreur est survenue.');
        } else if (err.request) {
          message.error('Problème de connexion. Veuillez réessayer plus tard.');
        } else {
          message.error('Une erreur inconnue est survenue.');
        }
        loadingBar.error();
      }
    }
  });
}
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
  border-radius: 5px;
  width: 100%;
  padding: 20px;
  max-width: 500px;
  min-width: 300px;
  background: #dddddd;
  margin: auto 20px;
}

</style>
