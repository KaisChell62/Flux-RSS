<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRssStore } from '../store';

// Props
const props = defineProps<{
  feedId?: string;
  searchQuery?: string;
  showFavorites?: boolean;
}>();

const rssStore = useRssStore();
const router = useRouter();

// Liste des news à afficher
const newsList = computed(() => {
  if (props.searchQuery) {
    return rssStore.searchNews(props.searchQuery);
  } else if (props.showFavorites) {
    return rssStore.favorites;
  } else if (props.feedId) {
    return rssStore.news.filter(news => news.feedId === props.feedId);
  }
  return [];
});

// Formater la date
const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (e) {
    return dateStr;
  }
};

// Naviguer vers le détail d'une news
const goToNewsDetail = (newsId: string) => {
  router.push({ name: 'news', params: { id: newsId } });
};

// Vérifier si une news est en favori
const isFavorite = (newsId: string) => {
  return rssStore.isFavorite(newsId);
};

// Ajouter/supprimer des favoris
const toggleFavorite = (newsId: string, event: Event) => {
  event.stopPropagation();
  if (isFavorite(newsId)) {
    rssStore.removeFromFavorites(newsId);
  } else {
    rssStore.addToFavorites(newsId);
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold mb-4">
      <template v-if="showFavorites">Articles favoris</template>
      <template v-else-if="searchQuery">Résultats de recherche</template>
      <template v-else>Articles</template>
    </h2>
    
    <div v-if="newsList.length === 0" class="text-gray-500 text-center py-4">
      <template v-if="showFavorites">
        Aucun article favori. Cliquez sur l'étoile à côté d'un article pour l'ajouter aux favoris.
      </template>
      <template v-else-if="searchQuery">
        Aucun résultat trouvé pour "{{ searchQuery }}".
      </template>
      <template v-else>
        Aucun article disponible.
      </template>
    </div>
    
    <ul v-else class="space-y-4">
      <li
        v-for="news in newsList"
        :key="news.id"
        @click="goToNewsDetail(news.id)"
        class="card cursor-pointer"
      >
        <div class="flex justify-between items-start">
          <h3 class="font-medium text-lg">{{ news.title }}</h3>
          
          <button
            @click="(e) => toggleFavorite(news.id, e)"
            :class="['text-2xl', isFavorite(news.id) ? 'text-yellow-500' : 'text-gray-300']"
            :title="isFavorite(news.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
          >
            ★
          </button>
        </div>
        
        <p class="text-sm text-gray-500 mt-1">{{ formatDate(news.pubDate) }}</p>
        
        <p class="mt-2 text-gray-700 line-clamp-2">
          {{ news.description.replace(/<[^>]*>/g, '') }}
        </p>
        
        <div class="mt-3 text-blue-500 text-sm">Lire la suite →</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>