import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue'; // Assurez-vous que le chemin est correct
import VerifyLicencePage from '@/pages/VerifyLicencePage.vue'; // Si une page "Signup" existe
import ConnectedPage from "@/pages/ConnectedPage.vue";
const routes = [
  {
    path: '/', // La route racine correspond à la page d'accueil
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/users/verify-licence',
    name: 'Verify-licence',
    component: VerifyLicencePage,
  },
  {
    path:'/users/connected',
    name: 'Connected',
    component: ConnectedPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
