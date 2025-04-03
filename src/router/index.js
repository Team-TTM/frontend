import {createRouter, createWebHistory} from 'vue-router';
import AuthentificationPage from '@/pages/AuthentificationPage.vue'; // Assurez-vous que le chemin est correct
import VerifyLicencePage from '@/pages/VerifyLicencePage.vue'; // Si une page "Signup" existe
import InscriptionPage from '@/pages/InscriptionPage.vue';
import connexionPage from '@/pages/ConnexionPage.vue';
import ConnectedPage from '@/pages/ConnectedPage.vue';
import CsvListeAdherent from '@/pages/CsvListeAdherent.vue';
import ClubPage from '@/pages/ClubPage.vue';
import EntrainementPage from '@/pages/EntrainementPage.vue';
import HomePage from '@/pages/HomePage.vue';
import EventPage from '@/pages/EventPage.vue';
import StagePage from '@/pages/StagePage.vue';
import CreateEventPage from '@/pages/CreateEventPage.vue';
import DetailEventPage from '@/pages/DetailEventPage.vue';
import EditEventPage from '@/pages/EditEventPage.vue';
import {store} from '@/store/index';
import {userRole} from '@/enums/userRole.js';
import ProfilePage from "@/pages/ProfilePage.vue";

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
    beforeEnter: (to, from) => {
      const role = store.getters.getRole;
      switch (role) {
        case userRole.ADMIN:
        case userRole.DIRIGEANT:
          return true;
        default:
          return false;
      }
    }
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
    path : '/profile',
    name : 'Profile',
    component : ProfilePage,
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
    path: '/connexion',
    name: 'Connexion',
    component: connexionPage
  },
  {
    path: '/accueil-auth',
    name: 'Accueil-auth',
    component: AuthentificationPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from) => {
  console.log(store.getters.isAuthenticated);
  switch (to.name) {
    case 'Inscription':
    case 'Connexion':
    case 'Verify-licence':
    case 'Accueil-auth':
      return true;
    default:
      if (store.getters.isAuthenticated) {
        return true;
      } else {
        return {name: 'Accueil-auth'};
      }
  }
})

export default router;
