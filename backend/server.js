const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
  console.log('Arrêt du serveur...');
  server.close(() => {
    process.exit(0);
  });
});
