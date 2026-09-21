
# 🧮 Calculateur d'IMC Fullstack — Projet DevOps

![CI](https://github.com/fotsingndiguev-dev/IMC-devops-project/actions/workflows/ci.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Docker](https://img.shields.io/badge/Docker-ready-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)

> Une application web complète qui calcule votre **Indice de Masse Corporelle (IMC)**.
> Ce projet a été conçu comme un **premier projet DevOps** : il couvre l'écriture du code, les tests, la conteneurisation et l'automatisation CI/CD.

---

## 📖 Table des matières

- [🧠 C'est quoi ce projet ?](#-cest-quoi-ce-projet-)
- [🎯 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [📁 Structure du projet](#-structure-du-projet)
- [🚀 Installation rapide](#-installation-rapide)
- [🐳 Lancer avec Docker](#-lancer-avec-docker)
- [🧪 Lancer les tests](#-lancer-les-tests)
- [📡 Documentation de l'API](#-documentation-de-lapi)
- [⚙️ CI/CD (GitHub Actions)](#️-cicd-github-actions)
- [🐛 Problèmes courants](#-problèmes-courants)
- [📚 Ce que j'ai appris](#-ce-que-jai-appris)
- [📝 Licence](#-licence)

---

## 🧠 C'est quoi ce projet ?

L'**IMC (Indice de Masse Corporelle)** est une mesure qui permet d'évaluer la corpulence d'une personne. Il se calcule avec la formule :

```
IMC = poids (kg) / taille² (m)
```

| IMC | Catégorie |
|-----|-----------|
| < 18.5 | Insuffisance pondérale |
| 18.5 – 24.9 | Corpulence normale |
| 25 – 29.9 | Surpoids |
| ≥ 30 | Obésité |

Cette application permet à l'utilisateur de saisir son poids et sa taille, puis affiche instantanément son IMC et sa catégorie.

**Mais ce n'est pas juste une calculatrice** : c'est un prétexte pour construire un **vrai pipeline DevOps complet**, avec tests automatisés, conteneurisation Docker et CI/CD.

---

## 🎯 Fonctionnalités

- ✅ Calcul de l'IMC en temps réel
- ✅ Affichage de la catégorie (avec code couleur)
- ✅ Validation des données saisies
- ✅ API REST documentée
- ✅ Endpoint `/health` pour vérifier que le serveur fonctionne
- ✅ Tests unitaires automatisés (Jest + Supertest)
- ✅ Pipeline CI/CD avec GitHub Actions
- ✅ Dockerisation complète (backend + frontend + base de données)

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐
│                 │  HTTP   │                 │
│   FRONTEND      │────────▶│    BACKEND      │
│   (HTML/JS)     │         │  (Node.js)      │
│                 │         │                 │
└─────────────────┘         └────────┬────────┘
                                     │
                                     │ (optionnel)
                                     ▼
                            ┌─────────────────┐
                            │  PostgreSQL     │
                            │  (historique)   │
                            └─────────────────┘
```

---

## 🛠️ Technologies utilisées

| Couche | Technologie | Rôle |
|--------|-------------|------|
| **Frontend** | HTML5, CSS3, JavaScript | Interface utilisateur |
| **Backend** | Node.js + Express | API REST |
| **Base de données** | PostgreSQL | Stockage de l'historique |
| **Tests** | Jest + Supertest | Tests automatisés |
| **Conteneurisation** | Docker + Docker Compose | Isolation et portabilité |
| **CI/CD** | GitHub Actions | Automatisation |
| **Serveur web** | Nginx | Sert le frontend |

---

## 📁 Structure du projet

```
imc-devops-project/
│
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline CI (tests + build Docker)
│
├── backend/                    # API Node.js
│   ├── app.js                  # Définition de l'application Express
│   ├── server.js               # Démarrage du serveur
│   ├── package.json            # Dépendances et scripts
│   ├── Dockerfile              # Recette Docker du backend
│   └── tests/
│       └── imc.test.js         # Tests unitaires
│
├── frontend/                   # Interface utilisateur
│   └── index.html              # Page web avec calcul d'IMC
│
├── docker-compose.yml          # Orchestration multi-conteneurs
├── .gitignore                  # Fichiers exclus de Git
└── README.md                   # Ce fichier !
```

---

## 🚀 Installation rapide

### Prérequis

Avant de commencer, tu dois avoir installé :

- **Node.js** version 20 ou plus → [Télécharger](https://nodejs.org)
- **Git** → [Télécharger](https://git-scm.com)
- **Docker** (optionnel, pour la partie conteneurisation) → [Télécharger](https://docker.com)

Pour vérifier tes installations :

```bash
node --version    # Doit afficher v20.x.x ou plus
npm --version     # Doit afficher 10.x.x ou plus
git --version     # Doit afficher 2.x.x
```

### Étapes d'installation

**1. Cloner le projet**

```bash
git clone https://github.com/fotsingndiguev-dev/IMC-devops-project.git
cd IMC-devops-project
```

**2. Installer les dépendances du backend**

```bash
cd backend
npm install
```

**3. Démarrer le serveur**

```bash
npm start
```

Tu devrais voir apparaître :

```
✅ Backend démarré sur http://localhost:3000
```

**4. Ouvrir le frontend**

Dans un **nouveau terminal** :

```bash
cd frontend
npx serve .
```

Puis ouvre ton navigateur sur `http://localhost:3000` et teste l'application !

---

## 🐳 Lancer avec Docker

Si tu as Docker installé, tu peux lancer tout le projet en **une seule commande** :

```bash
docker compose up --build
```

Cela va :

1. Construire l'image Docker du backend
2. Télécharger les images PostgreSQL et Nginx
3. Démarrer les 3 services
4. Exposer l'app sur `http://localhost:8080`

**Pour arrêter :**

```bash
docker compose down
```

**Pour tout nettoyer (y compris les données) :**

```bash
docker compose down -v
```

---

## 🧪 Lancer les tests

Les tests vérifient que l'API fonctionne correctement. On utilise **Jest** (framework de test) et **Supertest** (test des requêtes HTTP).

```bash
cd backend
npm test
```

**Résultat attendu :**

```
PASS  tests/imc.test.js
  API IMC
    ✓ Calcule un IMC normal (70kg, 1.75m)
    ✓ Détecte un surpoids (90kg, 1.75m)
    ✓ Refuse des valeurs invalides
    ✓ Le healthcheck répond OK

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

---

## 📡 Documentation de l'API

### `POST /api/imc`

Calcule l'IMC à partir du poids et de la taille.

**Requête :**

```bash
curl -X POST http://localhost:3000/api/imc \
  -H "Content-Type: application/json" \
  -d '{"poids":70,"taille":1.75}'
```

**Réponse (200 OK) :**

```json
{
  "imc": 22.86,
  "categorie": "Normal",
  "poids": 70,
  "taille": 1.75
}
```

**Réponse en cas d'erreur (400 Bad Request) :**

```json
{
  "erreur": "Poids et taille doivent être des nombres positifs"
}
```

---

### `GET /health`

Vérifie que le serveur fonctionne (utilisé par Docker et la CI).

**Requête :**

```bash
curl http://localhost:3000/health
```

**Réponse :**

```json
{
  "status": "ok",
  "timestamp": "2026-09-21T03:00:00.000Z"
}
```

---

## ⚙️ CI/CD (GitHub Actions)

À chaque `git push` sur la branche `main`, un pipeline automatique se lance sur GitHub :

```
┌────────────────────┐
│  1. Push du code   │
└─────────┬──────────┘
          ▼
┌────────────────────┐
│  2. Checkout       │  Récupère le code
└─────────┬──────────┘
          ▼
┌────────────────────┐
│  3. Setup Node.js  │  Installe Node 20
└─────────┬──────────┘
          ▼
┌────────────────────┐
│  4. npm ci         │  Installe les dépendances
└─────────┬──────────┘
          ▼
┌────────────────────┐
│  5. npm test       │  Lance les 4 tests
└─────────┬──────────┘
          ▼
┌────────────────────┐
│  6. Build Docker   │  Construit l'image
└────────────────────┘
```

**Si tout est ✅** → le badge en haut du README devient **vert**.
**Si une étape échoue ❌** → tu reçois une notification et peux consulter les logs.

👉 Le workflow complet est visible dans [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

---

## 🐛 Problèmes courants

### ❌ `npm error EJSONPARSE` — Le fichier `package.json` est cassé

**Cause :** Une virgule manquante ou des guillemets mal échappés.

**Solution :** Valide ton JSON avec :

```bash
node -e "JSON.parse(require('fs').readFileSync('package.json'))"
```

S'il n'y a pas d'erreur, ton fichier est valide.

---

### ❌ Les tests passent mais ne terminent jamais

**Cause :** Un "open handle" (généralement le serveur Express qui reste ouvert).

**Solution :** Le serveur doit être séparé en deux fichiers :

- `app.js` → définition de l'app (sans `app.listen`)
- `server.js` → démarrage du serveur

Les tests importent `app.js` et non `server.js`.

---

### ❌ `Cannot find module 'express'`

**Cause :** Les dépendances ne sont pas installées.

**Solution :**

```bash
cd backend
npm install
```

---

### ❌ La CI échoue avec "Missing script: test"

**Cause :** Le script `test` est manquant dans `package.json`.

**Solution :** Ajoute dans la section `scripts` :

```json
"test": "jest --detectOpenHandles"
```

---

## 📚 Ce que j'ai appris

Ce projet m'a permis de découvrir et maîtriser :

- 🟢 **Git & GitHub** : versionner son code, gérer des commits, pusher
- 🟢 **Node.js & Express** : créer une API REST
- 🟢 **Jest & Supertest** : écrire des tests automatisés
- 🟢 **Docker** : construire des images, orchestrer plusieurs conteneurs
- 🟢 **GitHub Actions** : automatiser les tests et le build
- 🟢 **Débogage** : lire des logs, comprendre les erreurs
- 🟢 **Bonnes pratiques** : séparation des responsabilités, variables d'environnement

---

## 🗺️ Feuille de route

Améliorations prévues :

- [x] Backend Node.js avec API REST
- [x] Tests unitaires automatisés
- [x] CI/CD avec GitHub Actions
- [x] Dockerisation du backend
- [ ] Sauvegarde de l'historique en base PostgreSQL
- [ ] Authentification utilisateur
- [ ] Déploiement sur VPS avec HTTPS
- [ ] Monitoring (Prometheus + Grafana)

---

## 📝 Licence

Ce projet est sous licence **MIT**. Tu peux l'utiliser, le modifier et le distribuer librement.

---

## 🙌 Remerciements

- La [documentation officielle Node.js](https://nodejs.org/docs)
- La [documentation Docker](https://docs.docker.com)
- La [documentation GitHub Actions](https://docs.github.com/actions)

---

**⭐ Si ce projet t'a aidé, n'hésite pas à lui mettre une étoile !**
