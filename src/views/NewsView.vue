<script setup lang="ts">
import { useRoute } from 'vue-router';
import NewsDetail from '../components/NewsDetail.vue';

const route = useRoute();
const newsId = route.params.id as string;
</script>

<template>
  <div>
    <NewsDetail :newsId="newsId" />
  </div>
</template>