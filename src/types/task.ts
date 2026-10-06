export type Task = {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'todo';
  completedAt?: string; // YYYY-MM-DD
  dueDate?: string; // YYYY-MM-DD
};
