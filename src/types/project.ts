export type Project = {
  id: string;
  title: string;
  description: string;
  createdAt?: string; // YYYY-MM-DD
  updateddAt?: string; // YYYY-MM-DD
  dueDate?: string; // YYYY-MM-DD
  status: 'completed' | 'in-progress' | 'todo';
};
