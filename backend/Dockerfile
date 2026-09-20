# ÉTAPE 1 : Image de base
FROM node:20-alpine

# ÉTAPE 2 : Dossier de travail
WORKDIR /app

# ÉTAPE 3 : Copier les fichiers de dépendances
COPY package*.json ./

# ÉTAPE 4 : Installer les dépendances de production
RUN npm ci --omit=dev

# ÉTAPE 5 : Copier le reste du code
COPY . .

# ÉTAPE 6 : Exposer le port
EXPOSE 3000

# ÉTAPE 7 : Commande de démarrage
CMD ["node", "server.js"]
