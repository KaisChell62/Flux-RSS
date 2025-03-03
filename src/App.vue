<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRssStore } from './store';

const router = useRouter();
const rssStore = useRssStore();

// Initialiser le store au chargement de l'application
onMounted(() => {
  rssStore.initStore();
});

// Navigation vers la page d'accueil
const goHome = () => {
  router.push('/');
};

// Navigation vers les préférences
const goToPreferences = () => {
  router.push('/preferences');
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Barre de navigation -->
    <nav class="bg-blue-600 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <h1 @click="goHome" class="text-xl font-bold cursor-pointer">Mon Lecteur RSS</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="goHome" class="hover:bg-blue-700 px-3 py-1 rounded">
            Accueil
          </button>
          <button @click="goToPreferences" class="hover:bg-blue-700 px-3 py-1 rounded">
            Préférences
          </button>
        </div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main class="container mx-auto p-4">
      <router-view />
    </main>

    <!-- Pied de page -->
    <footer class="bg-gray-800 text-white p-4 mt-8">
      <div class="container mx-auto text-center">
        <p>Mon Projet Vue - Lecteur RSS © {{ new Date().getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>