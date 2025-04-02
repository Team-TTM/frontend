<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <n-config-provider>
  <n-loading-bar-provider>
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
