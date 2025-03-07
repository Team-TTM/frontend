import { createRouter, createWebHistory } from 'vue-router';
import AuthentificationPage from '@/pages/AuthentificationPage.vue'; // Assurez-vous que le chemin est correct
import VerifyLicencePage from '@/pages/VerifyLicencePage.vue'; // Si une page "Signup" existe
import ConnectedPage from "@/pages/ConnectedPage.vue";
import CsvListeAdherent from "@/pages/CsvListeAdherent.vue";
import ClubPage from "@/pages/ClubPage.vue";
import EntrainementPage from "@/pages/EntrainementPage.vue";
import HomePage from "@/pages/HomePage.vue";
import EventPage from "@/pages/EventPage.vue";
import StagePage from "@/pages/StagePage.vue";
const routes = [
  {
    path: '/', // La route racine correspond à la page d'accueil
    name: 'Home',
    component: AuthentificationPage,
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
    path : '/users/HomePage',
    name : 'HomePage',
    component : HomePage
  },
  {
    path : '/users/ClubPage',
    name : 'ClubPage',
    component : ClubPage
  },
  {
    path : '/users/EntrainementPage',
    name : 'EntrainementPage',
    component : EntrainementPage
  },

  {
    path : '/users/EventPage',
    name : 'EventPage',
    component : EventPage
  },
  {
    path : '/users/StagePage',
    name : 'StagePage',
    component: StagePage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
