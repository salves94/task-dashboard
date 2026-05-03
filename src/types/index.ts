export type TaskCategory = 'Trabajo' | 'Personal' | 'Salud';

export type StatusFilter = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: TaskCategory;
  createdAt: number;
}