<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRssStore } from '../store';
import NewsList from '../components/NewsList.vue';

const route = useRoute();
const rssStore = useRssStore();
const loading = ref(false);
const error = ref('');

// Récupérer l'ID du flux depuis les paramètres de route
const feedId = route.params.id as string;

// Charger les articles du flux RSS
const loadFeed = async () => {
  try {
    loading.value = true;
    error.value = '';
    await rssStore.loadFeed(feedId);
  } catch (e) {
    error.value = 'Erreur lors du chargement du flux RSS';
    console.error(e);
  } finally {
    loading.value = false;
  }
};

// Récupérer les informations du flux
const feed = rssStore.getFeedById(feedId);

// Charger le flux au montage du composant
onMounted(() => {
  loadFeed();
});
</script>

<template>
  <div>
    <div v-if="feed" class="mb-6">
      <h1 class="text-2xl font-bold mb-2">{{ feed.title }}</h1>
      <p class="text-gray-500 mb-4">{{ feed.url }}</p>
      
      <button @click="loadFeed" class="btn" :disabled="loading">
        <span v-if="loading">Chargement...</span>
        <span v-else>Actualiser</span>
      </button>
    </div>
    
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      {{ error }}
    </div>
    
    <div v-if="!feed" class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
      Flux RSS non trouvé.
    </div>
    
    <NewsList v-if="feed" :feedId="feedId" />
  </div>
</template>