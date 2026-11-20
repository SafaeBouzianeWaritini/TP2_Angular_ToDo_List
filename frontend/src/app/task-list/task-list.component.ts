import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  // Modèle du formulaire d'ajout
  newTitle = '';
  newDescription = '';

  // Suivi de la tâche en cours de modification
  editingId: string | null = null;
  editTitle = '';
  editDescription = '';

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef   
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Charger toutes les tâches depuis l'API
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.cdr.markForCheck();   // ← prévient Angular de rafraîchir l'écran
      },
      error: (err) => console.error('Erreur chargement', err)
    });
  }

  // Ajouter une tâche
  addTask(): void {
    if (!this.newTitle.trim()) return;
    this.taskService
      .addTask({ title: this.newTitle, description: this.newDescription })
      .subscribe(() => {
        this.newTitle = '';
        this.newDescription = '';
        this.loadTasks();
      });
  }

  // Marquer terminée / non terminée
  toggleCompleted(task: Task): void {
    this.taskService
      .updateTask(task._id!, { completed: !task.completed })
      .subscribe(() => this.loadTasks());
  }

  // Passer en mode édition
  startEdit(task: Task): void {
    this.editingId = task._id!;
    this.editTitle = task.title;
    this.editDescription = task.description || '';
  }

  // Annuler l'édition
  cancelEdit(): void {
    this.editingId = null;
  }

  // Enregistrer la modification du contenu
  saveEdit(task: Task): void {
    if (!this.editTitle.trim()) return;
    this.taskService
      .updateTask(task._id!, { title: this.editTitle, description: this.editDescription })
      .subscribe(() => {
        this.editingId = null;
        this.loadTasks();
      });
  }

  // Supprimer une tâche
  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id!).subscribe(() => this.loadTasks());
  }
}