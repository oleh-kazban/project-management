import { useState } from 'react';

import DashboardGreeting from './DashboardGreeting';
import ProjectDetails from './ProjectDetails';
import { Project } from '../../types/project';
import { Task, TaskStatus } from '../../types/task';
import TaskList from '../tasks/TasksList';

const projectData = {
  id: crypto.randomUUID(),
  title: 'Learning React',
  description:
    'Learn React from the ground up. Start with the basics, finish with advanced knowledge, and put it all together in a project of your own.',
  createdAt: '2026-02-25T09:00:00.000Z',
  updatedAt: '2026-10-06T16:18:00.000Z',
  dueDate: '2026-12-25',
  status: 'in-progress',
} satisfies Project;
const tasksData = [
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

const ProjectsDashboard = () => {
  const [project, setProject] = useState<Project>(projectData);
  const [tasks, setTasks] = useState<Task[]>(tasksData);

  const handleProjectStatusChange = (status: Project['status']) => {
    setProject(currentProject => ({
      ...currentProject,
      status,
      updatedAt: new Date().toISOString(),
    }));
  };
  const handleAddTask = (task: Task) => {
    setTasks(previousTasks => [...previousTasks, task]);
  };
  const handleRemoveTask = (taskId: Task['id']) => {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== taskId));
  };
  const handleTaskStatusChange = (taskId: Task['id'], status: TaskStatus) => {
    setTasks(currentTasks =>
      currentTasks.map(task => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          status,
        };
      }),
    );
  };

  return (
    <>
      <DashboardGreeting username="Jordan" />
      <section
        aria-labelledby="project-title"
        className="grid w-full overflow-hidden rounded-2xl border border-default/10 bg-surface-raised shadow-2xl shadow-canvas/10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      >
        <ProjectDetails
          project={project}
          tasks={tasks}
          onStatusChange={handleProjectStatusChange}
        />
        <TaskList
          tasks={tasks}
          onAddTask={handleAddTask}
          onRemoveTask={handleRemoveTask}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </section>
    </>
  );
};

export default ProjectsDashboard;
