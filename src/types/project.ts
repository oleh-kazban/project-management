import { Status } from './status';
import { Task } from './task';

export type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string | null; // ISO 8601 timestamp
  dueDate: string; // YYYY-MM-DD
  status: Status;
};

export type ProjectsInfo = {
  id: string;
  title: string;
  tasks: Task[];
  status: Status;
}