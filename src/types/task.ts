export type Task = {
  id: string;
  title: string;
  createdAt: string; // ISO 8601 timestamp
  status: TaskStatus;
  completedAt?: string; // YYYY-MM-DD
  dueDate?: string; // YYYY-MM-DD
};

export type TaskStatus = 'completed' | 'in-progress' | 'todo';
