🏰 Gestion Disneyland - Plateforme Staff
Ce projet est une application web complète permettant la gestion des attractions, des missions et des alertes pour le personnel de Disneyland. Elle se compose d'un front-end en React (Vite) et d'un back-end Node.js.

📋 Prérequis
Avant de commencer, assurez-vous d'avoir installé :

Node.js (version LTS recommandée)

WAMP Server (pour la base de données MySQL)

1. Base de données (WAMP)
Lancez WAMP Server.

Importez votre base de données via PHPMyAdmin.

Important : Vous devez configurer la connexion à la base de données dans l'API.

Allez dans le dossier api/ (ou le nom de votre dossier back-end).

Ouvrez le fichier bdd.js.

Modifiez les paramètres (host, user, password, database) pour qu'ils correspondent à votre configuration locale WAMP.

2. Installation du Back-end (API Node.js)
Ouvrez un terminal dans le dossier racine du projet, puis :

Bash
cd api
npm install

3. Installation du Front-end (React Vite)
Ouvrez un second terminal dans le dossier racine du projet, puis :

Bash
cd Application Web
npm install

 Démarrage du projet
Pour que l'application fonctionne, WAMP Server doit être lancé.

Étape 1 : Lancer l'API
Dans le terminal dédié au back-end (/api) :

Bash
npm start
L'API devrait maintenant écouter sur son port configuré.

Étape 2 : Lancer le site (Interface)
Dans le terminal dédié au front-end (/client) :

Bash
npm run dev
Une fois lancé, cliquez sur l'URL (généralement http://localhost:5173) pour ouvrir le site dans votre navigateur.

[!IMPORTANT]
L'API doit être démarrée AVANT l'interface React. > Si le serveur Node.js n'est pas lancé (commande npm start), l'interface s'affichera mais aucune donnée (attractions, missions, alertes) ne pourra être chargée. Vous rencontrerez des erreurs de type Connection Refused ou des écrans vides.

Structure du Projet
/api : Serveur de données développé avec Node.js et Express.

/Application web : Interface utilisateur développée avec React et Vite.

/Base de données : Base de données