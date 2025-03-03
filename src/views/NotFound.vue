<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div class="text-6xl font-bold text-gray-300 mb-4">404</div>
    <h1 class="text-2xl font-bold mb-4">Page non trouvée</h1>
    <p class="text-gray-600 mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
    <button @click="goHome" class="btn">
      Retour à l'accueil
    </button>
  </div>
</template>