1. Nom du projet

Nom du projet : BDE Events

2. Présentation du projet

Ce projet est une plateforme web moderne dédiée à la gestion et à la réservation d'événements pour le Bureau des Étudiants (BDE) ou tout autre organisme universitaire.

Il s'adresse principalement aux administrateurs (qui organisent les événements) et aux étudiants (qui y participent).

Son objectif principal est de digitaliser et de simplifier le processus de billetterie, en offrant un espace centralisé pour découvrir les événements à venir, réserver sa place et gérer ses pass numériques de manière intuitive.

3. Problématique

Le problème identifié est que la gestion des événements étudiants (soirées, tournois, hackathons) se fait souvent via des canaux dispersés, rendant difficile le suivi des inscriptions, la gestion de la capacité maximale (jauge) et la distribution des billets.

La solution proposée est une application web intégrée (API Laravel + Frontend React) qui permet aux organisateurs de créer des événements avec des quotas précis, et aux étudiants de générer instantanément des tickets numériques uniques après réservation.

4. Fonctionnalités principales
Authentification & Rôles : Connexion sécurisée avec redirection automatique selon le rôle (Admin ou Student).
Espace Administrateur : Création d'événements (Titre, description, date, heure, lieu, prix, capacité maximale) et visualisation sous forme de tableau de bord.
Espace Étudiant : Consultation du catalogue des événements disponibles.
Système de Réservation : Réservation de places en un clic avec gestion dynamique des stocks (blocage automatique si l'événement est complet).
Billetterie Numérique : Espace "Mes Billets" affichant des tickets virtuels stylisés avec un code de réservation unique pour chaque étudiant.
5. Technologies utilisées
Technologie	Utilisation dans le projet
Laravel 11 (PHP)	Développement de l'API RESTful (Backend), authentification (Sanctum) et gestion de la base de données.
React.js & Vite	Développement de l'interface utilisateur (Frontend) dynamique en Single Page Application (SPA).
Tailwind CSS	Stylisation moderne, responsive et création d'animations UI/UX fluides.
MySQL	Stockage et structuration des données relationnelles (Users, Events, Reservations).
Axios	Gestion des requêtes HTTP asynchrones entre le Frontend React et l'API Laravel.
6. Installation et lancement

Le projet est divisé en deux parties :

Backend : API Laravel
Frontend : Client React
6.1 Prérequis

Pour utiliser ce projet, vous devez disposer de :

PHP 8.2 ou supérieur
Composer
Node.js et npm
Un serveur local avec MySQL (ex. : XAMPP, Laragon)
Git
6.2 Cloner le dépôt
git clone https://github.com/VOTRE_NOM_UTILISATEUR/bde-events.git

6.3 Configuration du Backend (Laravel)

Accédez au dossier du backend :

cd backend


Installez les dépendances :

composer install


Copiez le fichier .env.example :

cp .env.example .env


Configurez ensuite les variables de connexion à votre base de données MySQL :

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bde_events
DB_USERNAME=root
DB_PASSWORD=


Générez la clé de l'application :

php artisan key:generate


Lancez les migrations :

php artisan migrate


Enfin, démarrez le serveur Laravel :

php artisan serve

6.4 Configuration du Frontend (React)

Ouvrez un nouveau terminal et naviguez vers le dossier frontend :

cd frontend


Installez les dépendances :

npm install


Lancez le serveur de développement :

npm run dev

6.5 Ouvrir le projet

Après le lancement, l'application React sera accessible à l'adresse suivante :

http://localhost:5173

7. Captures d'écran
Capture 1 — Tableau de Bord Administrateur
Image

Insérer ici la capture d'écran du tableau de bord administrateur.

Explication

Cette capture montre l'interface d'administration listant tous les événements créés, avec leurs détails (Prix, Date, Lieu, Capacité) et un bouton d'accès rapide vers le formulaire de création.

Capture 2 — Catalogue Étudiant et Réservation
Image

Insérer ici la capture d'écran du catalogue étudiant.

Explication

L'espace étudiant affiche les événements sous forme de cartes interactives. Les boutons s'adaptent dynamiquement (Réservation possible, Événement complet ou Ticket déjà réservé) selon le statut de l'utilisateur.

Capture 3 — Mes Billets Numériques
Image

Insérer ici la capture d'écran de la section "Mes Billets".

Explication

Cette section affiche les réservations validées sous forme de tickets de spectacle stylisés, incluant un code de réservation unique et les informations clés de l'événement.

8. Contribution personnelle

Ma contribution principale a porté sur la conception et le développement complet de l'architecture Full-Stack de l'application, en séparant le Backend (API) du Frontend.

Côté Backend

J'ai géré la modélisation de la base de données relationnelle et sécurisé les endpoints via Laravel.

Côté Frontend

J'ai implémenté les Hooks React (useState, useEffect) pour gérer l'état global de l'application, l'affichage conditionnel, ainsi que la conception d'une interface utilisateur (UX/UI) professionnelle et moderne à l'aide de Tailwind CSS.

9. Difficultés rencontrées
Difficulté 1 — Gestion des données asynchrones dans React
Problème rencontré

Gérer l'affichage des données asynchrones dans React (listes d'événements) et éviter les erreurs de type map is not a function ou les boucles infinies (Infinite Loop) lors du re-rendu des composants après une réservation.

Recherches / Tests

J'ai d'abord essayé d'injecter directement la réponse de la requête Axios dans le State React, ce qui causait le crash de l'application car l'API Laravel retournait un objet JSON encapsulé et non un tableau direct.

De plus, déclencher une fonction de réservation au sein d'un useEffect causait des rendus continus.

Solution

J'ai corrigé l'extraction des données en ciblant la bonne couche de la réponse API :

result.data.data


Pour les boucles infinies, j'ai restructuré mon code en sortant les fonctions d'action (reserve) du useEffect pour les lier exclusivement aux événements onClick.

J'ai également fait en sorte de rappeler la fonction de rafraîchissement des données uniquement après le succès de la requête HTTP.

Ce que j'ai appris

J'ai acquis une maîtrise approfondie du cycle de vie des composants fonctionnels sous React.

J'ai appris à structurer correctement mes Dependency Arrays dans les Hooks et à déboguer efficacement la communication entre un frontend JavaScript et une API REST PHP.

10. Améliorations possibles

Dans une prochaine version, je pourrais :

Générer un véritable Code QR sur les tickets numériques afin de permettre un scan rapide à l'entrée de l'événement.
Intégrer une passerelle de paiement (comme Stripe) pour gérer l'achat des billets payants en ligne.
Ajouter la possibilité de télécharger le ticket au format PDF.
Mettre en place un système d'envoi d'e-mails de confirmation après chaque réservation réussie.
11. Conclusion

Ce projet m'a permis de consolider mes compétences en développement Full-Stack.

La combinaison de Laravel et React s'est avérée extrêmement puissante pour construire une plateforme robuste, évolutive et offrant une excellente expérience utilisateur.

Les améliorations futures permettront de rendre la plateforme BDE Events totalement autonome, en gérant l'intégralité du cycle de vie d'un événement, de sa découverte jusqu'au contrôle d'accès le jour J.
