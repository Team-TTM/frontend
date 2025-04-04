<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';
import {computed} from 'vue';
import {store} from '@/store/index';
import FooterComponent from "@/components/FooterComponent.vue";

const isUserLoggedIn = computed(() => store.getters.isAuthenticated);

</script>

<template>
  <n-config-provider>
  <n-loading-bar-provider>
    <n-message-provider>
      <HeaderComponent :connected="isUserLoggedIn"/>
      <div class="app-body">
        <RouterView />
      </div>
      <FooterComponent/>
    </n-message-provider>
  </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>

.app-body {
  min-height: calc(100vh - 120px); /* Ajuste selon la hauteur de ton header + footer */
  background-color: #f9f9f9;
}

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
