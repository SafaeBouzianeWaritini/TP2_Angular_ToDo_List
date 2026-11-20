// server.js
// Point d'entrée du backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());          // autorise le frontend Angular (localhost:4200)
app.use(express.json());  // permet de lire le JSON du body des requêtes

// Routes
app.use('/tasks', taskRoutes);

// Connexion à MongoDB puis démarrage du serveur
mongoose
  .connect('mongodb://127.0.0.1:27017/todolist')
  .then(() => {
    console.log('Connecté à MongoDB');
    app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Erreur MongoDB :', err));