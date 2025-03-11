# Frontend - Triathlon Toulouse Métropole
Ce répertoire contient l'interface utilisateur du projet Triathlon Toulouse Métropole développée avec Vue 3 et Vite.


Structure du projet
Le frontend est une application Vue.js qui fournit l'interface utilisateur pour les adhérents et administrateurs du club de triathlon.
Technologies utilisées
* Vue 3 - Framework JavaScript progressif 
* Vite - Outil de build ultrarapide
* Cypress - Framework de test pour les tests de composants et E2E
* ESLint - Outil d'analyse de code statique

## Installation

```sh
  npm install
```


## Commandes disponibles

### Développement avec rechargement à chaud

```ssh
    npm run dev
```

### Compilation pour la production

```ssh
    npm run build
```

### Lancer les tests

```ssh
    npm run test
```

### Linting avec ESLint

```ssh
    npm run lint
```


## Déploiement
Le déploiement est automatisé via GitHub Actions. Lors d'un push sur la branche main, le workflow suivant est exécuté :


1. Installation des dépendances 
2. Vérification du code avec ESLint 
3. Build du projet 
4. Déploiement des fichiers via FTPS vers le serveur de production

Le site est accessible à l'adresse : https://portal.triathlontoulousemetropole.com/
