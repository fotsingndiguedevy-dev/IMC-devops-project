const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à PostgreSQL (optionnelle pour l'instant)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Route de santé (healthcheck)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Route de calcul d'IMC
app.post('/api/imc', (req, res) => {
  const { poids, taille } = req.body;

  // Validation
  if (!poids || !taille || poids <= 0 || taille <= 0) {
    return res.status(400).json({ 
      erreur: 'Poids et taille doivent être des nombres positifs' 
    });
  }

  // Calcul de l'IMC
  const imc = poids / (taille * taille);
  
  // Détermination de la catégorie
  let categorie;
  if (imc < 18.5) categorie = 'Insuffisance pondérale';
  else if (imc < 25) categorie = 'Normal';
  else if (imc < 30) categorie = 'Surpoids';
  else categorie = 'Obésité';

  res.json({ 
    imc: parseFloat(imc.toFixed(2)), 
    categorie,
    poids,
    taille
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
});

module.exports = app;
