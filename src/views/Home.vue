<script setup lang="ts">
import { ref } from 'vue';
import AddFeed from '../components/AddFeed.vue';
import FeedList from '../components/FeedList.vue';
import NewsList from '../components/NewsList.vue';

const searchQuery = ref('');
const showFavorites = ref(false);

// Gérer l'ajout d'un flux
const handleFeedAdded = () => {
  // Réinitialiser la recherche et les favoris
  searchQuery.value = '';
  showFavorites.value = false;
};

// Effectuer une recherche
const performSearch = () => {
  showFavorites.value = false;
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
      <h1 class="text-4xl font-bold text-center text-blue-600 mb-12">Tableau de bord RSS</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Section Ajouter un flux RSS -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold mb-4">Ajouter un flux RSS</h2>
          <AddFeed @feed-added="handleFeedAdded" />
        </div>
        <!-- Section Mes flux RSS -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold mb-4">Mes flux RSS</h2>
          <FeedList />
        </div>
      </div>
    </div>
  </div>
</template>