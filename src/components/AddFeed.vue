<script setup lang="ts">
import { ref } from 'vue';
import { useRssStore } from '../store';

const rssStore = useRssStore();

const title = ref('');
const url = ref('');
const error = ref('');
const isSubmitting = ref(false);

// Ajouter un nouveau flux RSS
const addFeed = async () => {
  // Validation des champs
  if (!title.value.trim() || !url.value.trim()) {
    error.value = 'Veuillez remplir tous les champs';
    return;
  }

  // Validation de l'URL
  try {
    new URL(url.value);
  } catch (e) {
    error.value = 'URL invalide';
    return;
  }

  try {
    isSubmitting.value = true;
    error.value = '';
    
    // Ajouter le flux via le store
    await rssStore.addFeed(title.value, url.value);
    
    // Réinitialiser le formulaire
    title.value = '';
    url.value = '';
    
    // Émettre un événement pour informer le parent
    emit('feed-added');
  } catch (e) {
    error.value = rssStore.error || 'Erreur lors de l\'ajout du flux';
  } finally {
    isSubmitting.value = false;
  }
};

// Définir l'événement émis
const emit = defineEmits<{
  (e: 'feed-added'): void
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Ajouter un flux RSS</h2>
    
    <form @submit.prevent="addFeed" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="input"
          placeholder="Mon flux RSS"
          :disabled="isSubmitting"
        />
      </div>
      
      <div>
        <label for="url" class="block text-sm font-medium text-gray-700 mb-1">URL du flux RSS</label>
        <input
          id="url"
          v-model="url"
          type="text"
          class="input"
          placeholder="https://exemple.com/rss.xml"
          :disabled="isSubmitting"
        />
      </div>
      
      <div v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </div>
      
      <button
        type="submit"
        class="btn w-full"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">Ajout en cours...</span>
        <span v-else>Ajouter</span>
      </button>
    </form>
  </div>
</template>