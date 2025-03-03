import { defineStore } from 'pinia';
import axios from 'axios';

// Types pour notre store
interface Feed {
  id: string;
  title: string;
  url: string;
}

interface News {
  id: string;
  feedId: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image?: string;
  content?: string;
}

interface RootState {
  feeds: Feed[];
  currentFeed: Feed | null;
  news: News[];
  favorites: News[];
  loading: boolean;
  error: string | null;
  newsLimit: number;
}

// Fonction pour parser le XML RSS
const parseRSS = (xml: string): News[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const items = xmlDoc.querySelectorAll("item");

  return Array.from(items).map((item, index) => {
    return {
      id: `${Date.now()}-${index}`,
      feedId: "", // Sera défini lors du chargement
      title: item.querySelector("title")?.textContent || "Sans titre",
      link: item.querySelector("link")?.textContent || "",
      description: item.querySelector("description")?.textContent || "Pas de description.",
      pubDate: item.querySelector("pubDate")?.textContent || new Date().toISOString(),
      image: item.querySelector("enclosure")?.getAttribute("url") || "",
      content: item.querySelector("description")?.textContent || "Aucun contenu disponible."
    };
  });
};

// Création du store avec Pinia
export const useRssStore = defineStore('rss', {
  state: (): RootState => ({
    feeds: [],
    currentFeed: null,
    news: [],
    favorites: [],
    loading: false,
    error: null,
    newsLimit: 10
  }),

  getters: {
    getFeedById: (state) => (id: string) => state.feeds.find(feed => feed.id === id),
    getNewsById: (state) => (id: string) => state.news.find(news => news.id === id) || state.favorites.find(news => news.id === id),
    isFavorite: (state) => (id: string) => state.favorites.some(news => news.id === id),
  },

  actions: {
    // Initialiser les données depuis localStorage
    initStore() {
      this.feeds = JSON.parse(localStorage.getItem('rss-feeds') || '[]');
      this.favorites = JSON.parse(localStorage.getItem('rss-favorites') || '[]');
    },

    // Sauvegarde dans localStorage
    saveToStorage() {
      localStorage.setItem('rss-feeds', JSON.stringify(this.feeds));
      localStorage.setItem('rss-favorites', JSON.stringify(this.favorites));
    },

    // Ajouter un flux RSS
    async addFeed(title: string, url: string) {
      try {
        this.loading = true;
        this.error = null;

        // Vérifier si l'URL est valide en essayant de charger le flux
        await this.fetchRssFeed(url);

        const newFeed: Feed = { id: Date.now().toString(), title, url };
        this.feeds.push(newFeed);
        this.saveToStorage();
        return newFeed;
      } catch (error) {
        this.error = "Impossible d'ajouter ce flux RSS. Vérifiez l'URL.";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Supprimer un flux RSS
    removeFeed(id: string) {
      this.feeds = this.feeds.filter(feed => feed.id !== id);
      this.favorites = this.favorites.filter(news => news.feedId !== id);
      this.saveToStorage();

      if (this.currentFeed?.id === id) {
        this.currentFeed = null;
        this.news = [];
      }
    },

    // Charger les articles d'un flux RSS
    async loadFeed(feedId: string) {
      try {
        this.loading = true;
        this.error = null;

        const feed = this.getFeedById(feedId);
        if (!feed) throw new Error("Flux RSS non trouvé");

        this.currentFeed = feed;
        const newsItems = await this.fetchRssFeed(feed.url);

        this.news = newsItems.slice(0, this.newsLimit).map(item => ({ ...item, feedId }));
      } catch (error) {
        this.error = "Erreur lors du chargement du flux RSS";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    // Récupérer et parser un flux RSS
    async fetchRssFeed(url: string): Promise<News[]> {
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const response = await axios.get(proxyUrl);

        if (response.status !== 200) throw new Error("Erreur de récupération du flux RSS");

        return parseRSS(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du flux RSS:", error);
        throw error;
      }
    },

    // Ajouter aux favoris
    addToFavorites(newsId: string) {
      const news = this.getNewsById(newsId);
      if (news && !this.isFavorite(newsId)) {
        this.favorites.push(news);
        this.saveToStorage();
      }
    },

    // Supprimer des favoris
    removeFromFavorites(newsId: string) {
      this.favorites = this.favorites.filter(news => news.id !== newsId);
      this.saveToStorage();
    },

    // Rechercher une news
    searchNews(query: string): News[] {
      const searchTerm = query.toLowerCase();
      return [...this.news, ...this.favorites].filter(news =>
        news.title.toLowerCase().includes(searchTerm) || news.description.toLowerCase().includes(searchTerm)
      );
    },

    // Ajouter la fonction updateFeed
    updateFeed(id: string, newTitle: string, newUrl: string) {
      const feed = this.feeds.find(feed => feed.id === id);
      if (feed) {
        feed.title = newTitle;
        feed.url = newUrl;
        this.saveToStorage();
      }
    },

    // Add a new action to set the news limit
    setNewsLimit(limit: number) {
      this.newsLimit = limit;
    }
  }
});
