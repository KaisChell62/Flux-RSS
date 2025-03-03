<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRssStore } from '../store';

const rssStore = useRssStore();
const router = useRouter();

// Liste des flux RSS
const feeds = computed(() => rssStore.feeds);

// Naviguer vers un flux RSS
const goToFeed = (feedId: string) => {
  router.push({ name: 'feed', params: { id: feedId } });
};

// Supprimer un flux RSS
const removeFeed = (feedId: string, event: Event) => {
  event.stopPropagation();
  if (confirm('Êtes-vous sûr de vouloir supprimer ce flux RSS ?')) {
    rssStore.removeFeed(feedId);
  }
};

// Add vanilla JavaScript validation for the RSS feed form
const validateFeedForm = (title, url) => {
  if (!title || !url) {
    alert('Le titre et l\'URL sont requis.');
    return false;
  }
  return true;
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold mb-4">Mes flux RSS</h2>
    
    <div v-if="feeds.length === 0" class="text-gray-500 text-center py-4">
      Aucun flux RSS ajouté. Utilisez le formulaire ci-dessus pour ajouter votre premier flux.
    </div>
    
    <ul v-else class="space-y-2">
      <li
        v-for="feed in feeds"
        :key="feed.id"
        @click="goToFeed(feed.id)"
        class="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer flex justify-between items-center"
      >
        <div>
          <h3 class="font-medium" v-if="!feed.isEditing">{{ feed.title }}</h3>
          <input v-else v-model="feed.title" class="input" placeholder="Titre du flux" />
          <p class="text-sm text-gray-500 truncate" v-if="!feed.isEditing">{{ feed.url }}</p>
          <input v-else v-model="feed.url" class="input" placeholder="URL du flux" />
        </div>
        <div class="flex space-x-2">
          <button
            @click.stop="() => {
              if (feed.isEditing && validateFeedForm(feed.title, feed.url)) {
                feed.isEditing = false;
                // Save changes to the feed
                rssStore.updateFeed(feed.id, feed.title, feed.url);
              } else if (!feed.isEditing) {
                feed.isEditing = true;
              }
            }"
            class="text-blue-500 hover:text-blue-700"
            title="Modifier"
          >
            <span v-if="!feed.isEditing">Modifier</span>
            <span v-else>Enregistrer</span>
          </button>
          <button
            @click="(e) => removeFeed(feed.id, e)"
            class="text-red-500 hover:text-red-700"
            title="Supprimer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>