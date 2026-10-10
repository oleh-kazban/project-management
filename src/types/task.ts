import { Status } from './status';

export type Task = {
  id: string;
  projectId: string;
  title: string;
  createdAt: string; // ISO 8601 timestamp
  status: Status;
  completedAt: string | null; // ISO 8601 timestamp
  updatedAt: string | null; // ISO 8601 timestamp
  dueDate?: string; // YYYY-MM-DD
};
