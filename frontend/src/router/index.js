import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/pages/HomePage.vue'; // Assurez-vous que le chemin est correct
import SignupPage from '@/components/pages/SignupPage.vue'; // Si une page "Signup" existe
import ConnectedPage from "@/components/pages/ConnectedPage.vue";
import GoogleCallback from "@/components/pages/GoogleCallback.vue";

const routes = [
  {
    path: '/', // La route racine correspond à la page d'accueil
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/users/signup',
    name: 'Signup',
    component: SignupPage,
  },
  {
    path:'/users/connected',
    name: 'Connected',
    component: ConnectedPage,
  },
  {
    path: '/google/callback',
    name: 'google-callback',
    component: GoogleCallback,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
