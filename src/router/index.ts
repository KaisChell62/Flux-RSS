import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Import des vues
import Home from '../views/Home.vue';
import FeedView from '../views/FeedView.vue';
import NewsView from '../views/NewsView.vue';
import PreferencesView from '../views/PreferencesView.vue';
import NotFound from '../views/NotFound.vue';

// Définition des routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'Accueil' }
  },
  {
    path: '/feed/:id',
    name: 'feed',
    component: FeedView,
    props: true,
    meta: { title: 'Flux RSS' }
  },
  {
    path: '/news/:id',
    name: 'news',
    component: NewsView,
    props: true,
    meta: { title: 'Détail de l\'article' }
  },
  {
    path: '/preferences',
    name: 'preferences',
    component: PreferencesView,
    meta: { title: 'Préférences' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { title: 'Page non trouvée' }
  }
];

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Mise à jour du titre de la page
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Mon Projet Vue'} | Lecteur RSS`;
  next();
});

export default router;