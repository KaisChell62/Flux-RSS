<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Préférences disponibles
const darkMode = ref(false);
const fontSize = ref('medium');
const autoRefresh = ref(false);
const refreshInterval = ref(30);
const backgroundColor = ref('#ffffff');
const fontFamily = ref('Inter, system-ui, Avenir, Helvetica, Arial, sans-serif');
const scrollSpeed = ref(1);

// Options de taille de police
const fontSizeOptions = [
  { value: 'small', label: 'Petite' },
  { value: 'medium', label: 'Moyenne' },
  { value: 'large', label: 'Grande' }
];

// Options de police
const fontFamilyOptions = [
  { value: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', label: 'Inter' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Courier New, monospace', label: 'Courier New' }
];

// Charger les préférences depuis localStorage
onMounted(() => {
  const savedPrefs = localStorage.getItem('rss-preferences');
  if (savedPrefs) {
    const prefs = JSON.parse(savedPrefs);
    darkMode.value = prefs.darkMode || false;
    fontSize.value = prefs.fontSize || 'medium';
    autoRefresh.value = prefs.autoRefresh || false;
    refreshInterval.value = prefs.refreshInterval || 30;
    backgroundColor.value = prefs.backgroundColor || '#ffffff';
    fontFamily.value = prefs.fontFamily || 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif';
    scrollSpeed.value = prefs.scrollSpeed || 1;
  }
});

// Sauvegarder les préférences
const savePreferences = () => {
  const prefs = {
    darkMode: darkMode.value,
    fontSize: fontSize.value,
    autoRefresh: autoRefresh.value,
    refreshInterval: refreshInterval.value,
    backgroundColor: backgroundColor.value,
    fontFamily: fontFamily.value,
    scrollSpeed: scrollSpeed.value
  };
  
  localStorage.setItem('rss-preferences', JSON.stringify(prefs));
  
  // Émettre un événement pour informer le parent
  emit('preferences-saved', prefs);
  // Appliquer immédiatement les préférences
  if (prefs.darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  document.documentElement.style.fontSize = {
    small: '14px',
    medium: '16px',
    large: '18px'
  }[prefs.fontSize] || '16px';
  document.body.style.backgroundColor = prefs.backgroundColor;
  document.body.style.fontFamily = prefs.fontFamily;
  // Appliquer la vitesse de défilement
  document.documentElement.style.setProperty('--scroll-speed', `${prefs.scrollSpeed}s`);
};

// Réinitialiser les préférences
const resetPreferences = () => {
  darkMode.value = false;
  fontSize.value = 'medium';
  autoRefresh.value = false;
  refreshInterval.value = 30;
  backgroundColor.value = '#ffffff';
  fontFamily.value = 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif';
  scrollSpeed.value = 1;
  
  savePreferences();
};

// Définir les événements émis
const emit = defineEmits<{
  (e: 'preferences-saved', prefs: any): void
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold mb-4">Préférences</h2>
    
    <form @submit.prevent="savePreferences" class="space-y-6">
      <!-- Mode sombre -->
      <div class="flex items-center justify-between">
        <label for="darkMode" class="font-medium">Mode sombre</label>
        <div class="relative inline-block w-12 h-6">
          <input
            id="darkMode"
            v-model="darkMode"
            type="checkbox"
            class="opacity-0 w-0 h-0"
          />
          <span
            class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300"
            :class="{ 'bg-blue-500': darkMode }"
          >
            <span
              class="absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-all duration-300"
              :class="{ 'translate-x-6': darkMode }"
            ></span>
          </span>
        </div>
      </div>
      
      <!-- Taille de police -->
      <div>
        <label for="fontSize" class="block font-medium mb-2">Taille de police</label>
        <select
          id="fontSize"
          v-model="fontSize"
          class="input"
        >
          <option v-for="option in fontSizeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      
      <!-- Couleur de fond -->
      <div>
        <label for="backgroundColor" class="block font-medium mb-2">Couleur de fond</label>
        <input
          id="backgroundColor"
          v-model="backgroundColor"
          type="color"
          class="input"
        />
      </div>
      
      <!-- Police de caractères -->
      <div>
        <label for="fontFamily" class="block font-medium mb-2">Police de caractères</label>
        <select
          id="fontFamily"
          v-model="fontFamily"
          class="input"
        >
          <option v-for="option in fontFamilyOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      
      <!-- Actualisation automatique -->
      <div class="flex items-center justify-between">
        <label for="autoRefresh" class="font-medium">Actualisation automatique</label>
        <div class="relative inline-block w-12 h-6">
          <input
            id="autoRefresh"
            v-model="autoRefresh"
            type="checkbox"
            class="opacity-0 w-0 h-0"
          />
          <span
            class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300"
            :class="{ 'bg-blue-500': autoRefresh }"
          >
            <span
              class="absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-all duration-300"
              :class="{ 'translate-x-6': autoRefresh }"
            ></span>
          </span>
        </div>
      </div>
      
      <!-- Intervalle d'actualisation -->
      <div v-if="autoRefresh">
        <label for="refreshInterval" class="block font-medium mb-2">
          Intervalle d'actualisation (minutes): {{ refreshInterval }}
        </label>
        <input
          id="refreshInterval"
          v-model="refreshInterval"
          type="range"
          min="5"
          max="60"
          step="5"
          class="w-full"
        />
      </div>
      
      <!-- Vitesse de défilement -->
      <div>
        <label for="scrollSpeed" class="block font-medium mb-2">Vitesse de défilement (secondes)</label>
        <input
          id="scrollSpeed"
          v-model="scrollSpeed"
          type="number"
          min="0.5"
          max="10"
          step="0.1"
          class="input"
        />
      </div>
      
      <!-- Boutons d'action -->
      <div class="flex space-x-4">
        <button type="submit" class="btn flex-1">Enregistrer</button>
        <button type="button" @click="resetPreferences" class="btn-danger flex-1">Réinitialiser</button>
      </div>
    </form>
  </div>
</template>