const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Route de calcul d'IMC
app.post('/api/imc', (req, res) => {
  const { poids, taille } = req.body;

  if (!poids || !taille || poids <= 0 || taille <= 0) {
    return res.status(400).json({ 
      erreur: 'Poids et taille doivent être des nombres positifs' 
    });
  }

  const imc = poids / (taille * taille);
  
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

module.exports = app;
