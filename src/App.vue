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
    <HeaderComponent :connected="isUserLoggedIn"/>
    <n-message-provider>
      <RouterView/>
    </n-message-provider>
    <footer>
      © 2025 - Site TTM | Auteur | Support
    </footer>
  </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>

</style>
