import { createRouter, createWebHistory } from 'vue-router';
import AuthentificationPage from '@/pages/AuthentificationPage.vue'; // Assurez-vous que le chemin est correct
import VerifyLicencePage from '@/pages/VerifyLicencePage.vue'; // Si une page "Signup" existe
import InscriptionPage from '@/pages/InscriptionPage.vue';
import connexionPage from '@/pages/ConnexionPage.vue';
import ConnectedPage from "@/pages/ConnectedPage.vue";
import CsvListeAdherent from "@/pages/CsvListeAdherent.vue";
import ClubPage from "@/pages/ClubPage.vue";
import EntrainementPage from "@/pages/EntrainementPage.vue";
import HomePage from "@/pages/HomePage.vue";
import EventPage from "@/pages/EventPage.vue";
import StagePage from "@/pages/StagePage.vue";
import CreateEventPage from "@/pages/CreateEventPage.vue";
import DetailEventPage from "@/pages/DetailEventPage.vue";
import EditEventPage from "@/pages/EditEventPage.vue";
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
    path: "/users/EventPage",
    name: "EventPage",
    component: EventPage,
    props: route => ({ eventData: route.query })
  },

  {
    path : '/users/CreateEventPage',
    name : 'CreateEventPage',
    component : CreateEventPage
  },

  {
    path : '/users/DetailEventPage/:eventId',
    name : 'DetailEventPage',
    component: DetailEventPage,
    props : true,
  },

  {
    path : '/users/EditEventPage/:eventId',
    name : 'EditEventPage',
    component : EditEventPage,
    props : true,
  },

  {
    path : '/users/StagePage',
    name : 'StagePage',
    component: StagePage
  },
  {
    path: '/users/inscription',
    name: 'Inscription',
    component: InscriptionPage
  },
  {
    path: '/users/connexion',
    name: 'Connexion',
    component: connexionPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
