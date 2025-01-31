import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/pages/HomePage.vue'; // Assurez-vous que le chemin est correct
import VerifyLicence from '@/components/pages/VerifyLicence.vue'; // Si une page "Signup" existe
import ConnectedPage from "@/components/pages/ConnectedPage.vue";
const routes = [
  {
    path: '/', // La route racine correspond à la page d'accueil
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/users/verify-licence',
    name: 'Verify-licence',
    component: VerifyLicence,
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
