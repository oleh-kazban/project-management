export type Task = {
  id: string;
  projectId: string;
  title: string;
  createdAt: string; // ISO 8601 timestamp
  status: TaskStatus;
  completedAt?: string; // ISO 8601 timestamp
  dueDate?: string; // YYYY-MM-DD
};

export type TaskStatus = 'completed' | 'in-progress' | 'todo';
