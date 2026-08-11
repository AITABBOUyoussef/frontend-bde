# 💻 BDE Events - Frontend (Client)

## 📋 Présentation
Ce dépôt contient le code source de l'interface utilisateur (Frontend) du projet **BDE Events**. Il s'agit d'une application **Single Page Application (SPA)** développée avec **React.js** pour offrir une expérience fluide, interactive et moderne aux étudiants et administrateurs du Bureau des Étudiants.

## 🚀 Technologies Utilisées
- **React.js (via Vite) :** Bibliothèque principale pour la création d'interfaces dynamiques et performantes.
- **Tailwind CSS :** Framework CSS utilitaire pour un design sur-mesure, responsive et des animations fluides.
- **React Router DOM :** Gestion de la navigation sans rechargement de page.
- **Axios :** Client HTTP configuré pour communiquer avec l'API Laravel (Backend).

## ✨ Fonctionnalités Principales
- **Système d'Authentification :** Connexion et gestion des sessions sécurisées via `LocalStorage` (Tokens JWT/Sanctum).
- **Routage Dynamique :** Redirection intelligente selon le rôle de l'utilisateur (Admin vs Étudiant).
- **Espace Étudiant (UI) :**
  - Flux d'actualité des événements (Cards).
  - Boutons d'action conditionnels (Réserver, Complet, Déjà réservé).
  - Portefeuille de billets virtuels stylisés.
- **Espace Administrateur (UI) :**
  - Tableau de bord de gestion avec interface "Modern SaaS".
  - Formulaire interactif de création d'événements (Titre, Date, Capacité, etc.).

## 🛠️ Installation et Configuration

### 1. Prérequis
Assurez-vous d'avoir installé sur votre machine :
- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- npm (ou yarn)

### 2. Cloner le projet
```bash
git clone [https://github.com/VOTRE_NOM_UTILISATEUR/bde-events-frontend.git](https://github.com/VOTRE_NOM_UTILISATEUR/bde-events-frontend.git)
cd bde-events-frontend
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Variables d'environnement
Créez un fichier `.env` à la racine du projet pour lier le frontend à votre API Laravel. Ajoutez-y la ligne suivante :
```env
VITE_API_BASE_URL=http://localhost:8000/api
```
*(Note : Modifiez le port `8000` si votre backend Laravel tourne sur un autre port).*

### 5. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible instantanément sur : **http://localhost:5173**

## 📂 Architecture du Projet
- **`/src/api`** : Contient la configuration globale d'Axios (`axios.js`) pour l'interception des requêtes et l'ajout des tokens.
- **`/src/pages`** : Contient les vues principales de l'application (`Login.jsx`, `AdminDashboard.jsx`, `StudentDashboard.jsx`, `AddEvent.jsx`, `Tickets.jsx`).
- **`/src/components`** : Composants réutilisables à travers l'application (ex: `Navbar.jsx`).

## 🎨 Design et Expérience Utilisateur (UX)
L'interface a été conçue selon une approche "Mobile-First". Elle intègre :
- Des **animations de chargement** personnalisées (Spinners) pendant les appels API.
- Des **feedbacks visuels** clairs (alertes d'erreur, changements d'état des boutons).
- Une séparation visuelle par les couleurs (Palette *Emerald/Green* pour les étudiants, *Red/Slate* pour l'administration) pour bien distinguer les espaces.
