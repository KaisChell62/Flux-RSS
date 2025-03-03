import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';

// Création de l'application Vue
const app = createApp(App);

// Ajout de Pinia pour la gestion d'état
const pinia = createPinia();
app.use(pinia);

// Ajout de Vue Router pour la navigation
app.use(router);

// Montage de l'application
app.mount('#app');