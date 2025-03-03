<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRssStore } from '../store';

// Props
const props = defineProps<{
  newsId: string;
}>();

const rssStore = useRssStore();

// Récupérer les détails de la news
const news = computed(() => rssStore.getNewsById(props.newsId));

// Vérifier si la news est en favori
const isFavorite = computed(() => {
  if (!news.value) return false;
  return rssStore.isFavorite(news.value.id);
});

// Ajouter/supprimer des favoris
const toggleFavorite = () => {
  if (!news.value) return;
  
  if (isFavorite.value) {
    rssStore.removeFromFavorites(news.value.id);
  } else {
    rssStore.addToFavorites(news.value.id);
  }
};

// Ouvrir le lien original
const openOriginalLink = () => {
  if (news.value?.link) {
    window.open(news.value.link, '_blank');
  }
};
</script>

<template>
  <div v-if="news" class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-start mb-4">
      <h1 class="text-2xl font-bold">{{ news.title }}</h1>
      
      <div class="flex space-x-2">
        <button
          @click="toggleFavorite"
          :class="['text-2xl', isFavorite ? 'text-yellow-500' : 'text-gray-300']"
          :title="isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        >
          ★
        </button>
        
        <button
          v-if="news.link"
          @click="openOriginalLink"
          class="text-blue-500 hover:text-blue-700"
          title="Ouvrir le lien original"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>
    
    <div class="text-sm text-gray-500 mb-4">
      Publié le {{ new Date(news.pubDate).toLocaleString('fr-FR') }}
    </div>
    
    <div class="prose max-w-none" v-html="news.content || news.description"></div>
  </div>
  
  <div v-else class="bg-white rounded-lg shadow-md p-6 text-center">
    <p class="text-gray-500">Article non trouvé.</p>
  </div>
</template>

<style scoped>
.prose {
  max-width: 100%;
}

.prose img {
  max-width: 100%;
  height: auto;
}

.prose a {
  color: #3b82f6;
  text-decoration: underline;
}
</style>