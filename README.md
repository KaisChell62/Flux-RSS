# 📌 Projet : Lecteur de Flux RSS avec Vue 3, TypeScript et Vite

## 🏆 Description du projet
Ce projet est une **application web développée avec Vue 3, TypeScript et Vite**, permettant aux utilisateurs de **gérer des flux RSS**. Il permet l'ajout, la modification, la suppression de flux RSS, l'affichage des articles, la gestion des favoris et la recherche.

### 🎯 **Fonctionnalités principales**
✅ **Ajouter un flux RSS** : Entrer un titre et une URL pour enregistrer un flux 🔗  
✅ **Modifier un flux RSS** : Modifier le titre ou l'URL d'un flux RSS enregistré ✏️  
✅ **Supprimer un flux RSS** : Supprimer un flux de la liste enregistrée ❌  
✅ **Afficher les articles d’un flux RSS** : Lire les articles associés à un flux 📰  
✅ **Ajouter des articles en favoris** : Sauvegarder des articles pour une lecture ultérieure ⭐  
✅ **Rechercher une news dans les favoris** : Trouver rapidement un article favori 🔍  
✅ **Persistance des données** : Les flux et les favoris sont enregistrés via `localStorage` 💾  
✅ **Gestion des erreurs et validation des entrées** : Vérification des URLs de flux RSS 🛑
✅ **Expérience utilisateur améliorée avec Tailwind CSS** 🎨

---

## 📚 Qu’est-ce qu’un flux RSS ?
Un **flux RSS** est un fichier XML contenant une liste d’articles publiés sur un site web. Il permet de récupérer automatiquement les mises à jour d’un site (ex : actualités, blogs, etc.).

**Exemples de flux RSS populaires :**
- 🌍 **Actualités Internationales (New York Times)**  
  URL : `https://rss.nytimes.com/services/xml/rss/nyt/World.xml`
- 📰 **BBC News - Monde**  
  URL : `http://feeds.bbci.co.uk/news/world/rss.xml`
- 🏆 **ESPN - Sports**  
  URL : `https://www.espn.com/espn/rss/news`

---

## 🛠️ Technologies utilisées
- **Vue 3** : Framework frontend JavaScript moderne
- **TypeScript** : Typage statique robuste pour une meilleure maintenabilité
- **Vite** : Bundler ultra rapide pour Vue.js
- **Pinia** : Gestion d’état performante pour Vue 3
- **Vue Router** : Gestion des pages et navigation entre vues
- **Axios** : Pour récupérer les flux RSS via des requêtes HTTP
- **localStorage** : Sauvegarde des flux et favoris
- **Tailwind CSS** : Framework CSS pour un design épuré et responsive

---

## 🚀 Installation et lancement du projet
### **📥 1. Cloner le projet**
```sh
git clone https://github.com/ton-repo/flux-rss-vue.git
cd flux-rss-vue
```

### **📦 2. Installer les dépendances**
```sh
npm install
```

### **▶️ 3. Démarrer le serveur local**
```sh
npm run dev
```
🔹 **Ouvre l’application** dans ton navigateur : `http://localhost:5173/`

---

## 📂 Structure du projet
```
flux-rss-vue/
│── public/              # Contient les fichiers statiques
│   ├── vite.svg         # Logo du projet
│── src/                 # Code source principal
│   ├── assets/          # Ressources comme les images ou icônes
│   ├── components/      # Composants réutilisables
│   │   ├── AddFeed.vue         # Formulaire d'ajout de flux RSS
│   │   ├── FeedList.vue        # Liste des flux RSS enregistrés
│   │   ├── NewsDetail.vue      # Affichage des détails d’une news
│   │   ├── NewsList.vue        # Liste des articles d’un flux RSS
│   │   ├── Preferences.vue     # Gestion des favoris
│   ├── router/         # Configuration des routes Vue Router
│   │   ├── index.ts         # Définition des routes
│   ├── store/          # Gestion d'état avec Pinia
│   │   ├── index.ts         # Store principal
│   ├── views/          # Pages principales
│   │   ├── FeedView.vue        # Affichage des flux RSS
│   │   ├── Home.vue           # Page d'accueil
│   │   ├── NewsView.vue       # Page des articles
│   │   ├── NotFound.vue       # Page 404
│   │   ├── PreferencesView.vue # Page des favoris (préférences)
│   ├── App.vue          # Composant racine
│   ├── main.ts         # Point d’entrée de l'application
│   ├── style.css       # Fichier de styles
│── index.html          # Fichier HTML principal
│── package.json        # Dépendances et scripts
│── README.md           # Documentation du projet
│── tsconfig.json       # Configuration TypeScript
│── vite.config.ts      # Configuration Vite
```

---

## 🎮 Utilisation du projet
### **1️⃣ Ajouter un flux RSS**
- Remplis le **titre** et l'**URL du flux**.
- Clique sur **Ajouter**.

### **2️⃣ Modifier un flux RSS**
- Clique sur le bouton **"Modifier"** à côté du flux RSS.
- Change **le titre** ou **l'URL**.
- Clique sur **Enregistrer**.

### **3️⃣ Supprimer un flux RSS**
- Clique sur **"Supprimer"** à côté du flux RSS.

### **4️⃣ Afficher les articles d’un flux RSS**
- Clique sur un flux pour voir les articles associés.

### **5️⃣ Ajouter un article en favori**
- Clique sur le bouton **"⭐ Ajouter aux favoris"**.
- L’article est sauvegardé dans la page **Préférences**.

### **6️⃣ Rechercher une news dans les favoris**
- Va dans **Préférences**.
- Utilise la barre de recherche pour filtrer les articles sauvegardés.

---

## 🛠️ Fonctionnalités à améliorer
🚧 Ajout d'un **mode sombre** 🎨  
🚧 Ajout d'une **pagination pour les articles** 📄  
🚧 Intégration avec **d’autres APIs de news** 🌎  

---

## 🤝 Contribuer
Tu veux améliorer le projet ? Forke-le et fais une **Pull Request** ! 🚀

1. **Forker** le repo
2. **Créer une branche** (`git checkout -b feature/nouvelle-fonction`)
3. **Committer** (`git commit -m "Ajout d’une nouvelle fonctionnalité"`)
4. **Pusher** (`git push origin feature/nouvelle-fonction`)
5. **Créer une Pull Request**

---

## 📩 Contact
💡 **Développeur :** Ton Nom  
📧 **Email :** ton-email@example.com  
🔗 **GitHub :** [github.com/ton-profil](https://github.com/ton-profil)

🚀 **Merci d'utiliser ce projet !** 🔥

