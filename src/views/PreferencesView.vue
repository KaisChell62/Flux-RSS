<script setup lang="ts">
import { ref } from 'vue';
import Preferences from '../components/Preferences.vue';
import { useRssStore } from '../store';

const preferencesUpdated = ref(false);
const searchQuery = ref('');
const showFavorites = ref(false);
const rssStore = useRssStore();

// Gérer la sauvegarde des préférences
const handlePreferencesSaved = (prefs: any) => {
  preferencesUpdated.value = true;
  
  // Appliquer les préférences
  if (prefs.darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Appliquer la taille de police
  document.documentElement.style.fontSize = {
    small: '14px',
    medium: '16px',
    large: '18px'
  }[prefs.fontSize] || '16px';
  
  // Notification temporaire
  setTimeout(() => {
    preferencesUpdated.value = false;
  }, 3000);
};

// Effectuer une recherche
const performSearch = () => {
  const results = rssStore.searchNews(searchQuery.value);
  console.log('Résultats de recherche:', results);
};

// Afficher les favoris
const toggleFavorites = () => {
  showFavorites.value = !showFavorites.value;
  if (showFavorites.value) {
    searchQuery.value = '';
  }
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center text-blue-600 mb-12">Préférences</h1>
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div class="flex-1">
            <form @submit.prevent="performSearch" class="flex">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher des flux..."
                class="input flex-1"
              />
              <button type="submit" class="btn ml-2">
                Rechercher
              </button>
            </form>
          </div>
          <button
            @click="toggleFavorites"
            :class="['btn', showFavorites ? 'bg-yellow-500 hover:bg-yellow-600' : '']"
          >
            {{ showFavorites ? 'Tous les flux' : 'Favoris' }}
          </button>
        </div>
        <div v-if="showFavorites" class="mt-6">
          <h2 class="text-2xl font-semibold mb-4">Flux favoris</h2>
          <ul>
            <li v-for="favorite in rssStore.favorites" :key="favorite.id" class="mb-2">
              <h3 class="font-medium">{{ favorite.title }}</h3>
              <p class="text-sm text-gray-500">{{ favorite.description }}</p>
            </li>
          </ul>
        </div>
        <div v-else class="mt-6">
          <h2 class="text-2xl font-semibold mb-4">Tous les flux</h2>
          <!-- Afficher tous les flux ici -->
        </div>
        <div v-if="searchQuery" class="mt-6">
          <h2 class="text-2xl font-semibold mb-4">Résultats de recherche</h2>
          <ul>
            <li v-for="result in rssStore.searchNews(searchQuery)" :key="result.id" class="mb-2">
              <h3 class="font-medium">{{ result.title }}</h3>
              <p class="text-sm text-gray-500">{{ result.description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>