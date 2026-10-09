import { Status } from './status';

export type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
  dueDate: string; // YYYY-MM-DD
  status: Status;
};
