# TP2 – To-Do List (MEAN Stack)

## Prérequis
Node.js, Angular CLI, MongoDB (service démarré sur le port 27017).

## Lancer le backend
cd backend
npm install
npm run dev        # http://localhost:3000

## Lancer le frontend
cd frontend
npm install
ng serve           # http://localhost:4200

## API REST
| Méthode | Route       | Description               |
|---------|-------------|---------------------------|
| GET     | /tasks      | Lister les tâches         |
| POST    | /tasks      | Ajouter une tâche         |
| PUT     | /tasks/:id  | Modifier une tâche        |
| DELETE  | /tasks/:id  | Supprimer une tâche       |

## Fonctionnalités
- Ajout d'une tâche (titre + description) via un formulaire Angular
- Affichage de la liste avec statut (terminée / non terminée)
- Modification du contenu et changement de statut
- Suppression d'une tâche
- Données persistées dans MongoDB (champs : title, completed)
