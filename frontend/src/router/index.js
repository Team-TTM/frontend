import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/pages/HomePage.vue'; // Assurez-vous que le chemin est correct
import SignupPage from '@/components/pages/SignupPage.vue'; // Si une page "Signup" existe

const routes = [
  {
    path: '/', // La route racine correspond à la page d'accueil
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
