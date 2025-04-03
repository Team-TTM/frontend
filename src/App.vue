<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';
import {computed} from 'vue';
import {store} from '@/store/index';

const isUserLoggedIn = computed(() => store.getters.isAuthenticated);

</script>

<template>
  <n-config-provider>
  <n-loading-bar-provider>
    <n-message-provider>
      <HeaderComponent :connected="isUserLoggedIn"/>
      <RouterView/>
      <footer>
        © 2025 - Site TTM | Auteur | Support
      </footer>
    </n-message-provider>
  </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>
/*#content {
  background: #F0F0F0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}*/
</style>
