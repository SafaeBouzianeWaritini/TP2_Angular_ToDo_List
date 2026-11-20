// models/Task.js
// Schéma Mongoose décrivant une tâche dans MongoDB
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },   // titre de la tâche
    description: { type: String, default: '' },            // description (optionnelle)
    completed: { type: Boolean, default: false }           // statut, false par défaut
  },
  { timestamps: true } // ajoute createdAt et updatedAt automatiquement
);

module.exports = mongoose.model('Task', taskSchema);