import { Project } from '../../types/project';
import { Task } from '../../types/task';

export const projectsData = [
  {
    id: '1',
    title: 'Learning React basics',
    description:
      'Learn React from the ground up. Start with the basics.',
    createdAt: '2026-02-25T09:00:00.000Z',
    updatedAt: '2026-10-06T16:18:00.000Z',
    dueDate: '2026-12-25',
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'Learning React essentials',
    description:
      'Learn the most important React things.',
    createdAt: '2026-02-25T09:00:00.000Z',
    updatedAt: '2026-10-06T16:18:00.000Z',
    dueDate: '2026-12-25',
    status: 'todo',
  },
  {
    id: '3',
    title: 'Be a React hero',
    description:
      'Finish with advanced knowledge, and put it all together in a project of your own.',
    createdAt: '2026-02-25T09:00:00.000Z',
    updatedAt: '2026-10-06T16:18:00.000Z',
    dueDate: '2026-12-25',
    status: 'todo',
  },
] satisfies Project[];

export const tasksData = [
  {
    id: crypto.randomUUID(),
    title: 'Learn the basics of JSX',
    createdAt: '2026-10-04T09:00:00.000Z',
    completedAt: '2026-10-06',
    status: 'completed',
  },
  {
    id: crypto.randomUUID(),
    title: 'Build reusable components',
    createdAt: '2026-10-05T09:00:00.000Z',
    dueDate: '2026-11-06',
    status: 'in-progress',
  },
  {
    id: crypto.randomUUID(),
    title: 'Practice managing component state',
    createdAt: '2026-10-06T09:00:00.000Z',
    dueDate: '2026-12-06',
    status: 'todo',
  },
] satisfies Task[];
