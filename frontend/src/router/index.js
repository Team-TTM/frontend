import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue'; // Assurez-vous que le chemin est correct
import VerifyLicencePage from '@/pages/VerifyLicencePage.vue'; // Si une page "Signup" existe
import ConnectedPage from "@/pages/ConnectedPage.vue";
import CsvListeAdherent from "@/pages/CsvListeAdherent.vue";
import pageAccueil from "@/pages/pageAccueil.vue";
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
  {
    path:'/users/csvListeAdherent',
    name: 'CsvListeAdherent',
    component: CsvListeAdherent,
  },
  {
    path :'/users/pageAccueil',
    name :'pageAccueil',
    component : pageAccueil,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
