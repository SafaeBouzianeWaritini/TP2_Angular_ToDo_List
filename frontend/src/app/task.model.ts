// Interface décrivant une tâche (même structure que le backend)
export interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
}