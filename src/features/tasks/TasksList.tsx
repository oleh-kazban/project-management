import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Task } from '@pm/types';

import CreateTask from './CreateTask';
import TaskDetails from './TaskDetails';

type TaskListProps = {
  projectId: string;
  projectDueDate: string;
};

const TaskList = ({ projectId, projectDueDate }: TaskListProps) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const queryClient = useQueryClient();

  const handleShowAddTask = () => setShowAddTask(() => !showAddTask);
  const handleAddTask = (
    task: Omit<Task, 'projectId' | 'completedAt' | 'createdAt' | 'updatedAt'>,
  ) => {
    createTaskMutation.mutate({
      ...task,
      projectId,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      completedAt: null,
      dueDate: projectDueDate,
    });
  };
  const handleTaskStatusChange = (task: Task, status: Task['status']) => {
    updateTaskMutation.mutate({
      ...task,
      projectId,
      status,
      updatedAt: new Date().toISOString(),
      completedAt: status === 'completed' ? new Date().toISOString() : null,
    });
  };
  const handleTaskTitleChange = (task: Task, title: Task['title']) => {
    updateTaskMutation.mutate({ ...task, projectId, title, updatedAt: new Date().toISOString() });
  };
  const handleTaskRemove = (taskId: Task['id']) => {
    deleteTaskMutation.mutate(taskId);
  };

  const { data } = useQuery({
    queryKey: ['tasks', projectId],
    enabled: true,
    queryFn: async ({ signal }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, {
        signal,
      });

      if (!response.ok) throw new Error(`Can't fetch tasks`);

      const tasks: Task[] = await response.json();

      return { tasks };
    },
  });
  const createTaskMutation = useMutation({
    mutationFn: async (payload: Task) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Can't create task`);

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: error => console.log('Error: ', error),
  });
  const updateTaskMutation = useMutation({
    mutationFn: async (payload: Task) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Can't update task`);

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: error => console.log('Error: ', error),
  });
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`Can't delete task`);

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: error => console.log('Error: ', error),
  });

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">Tasks</h3>
            <span className="rounded-md bg-foreground/[0.06] px-2 py-0.5 text-xs text-foreground-muted">
              {data?.tasks.length ?? 0}
            </span>
          </div>
          <p className="mt-1 text-sm text-foreground-subtle">
            Break your project into small, actionable steps.
          </p>
        </div>
        <button
          className="inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-xl border border-default/10 px-3.5 py-2 text-sm font-medium text-foreground-secondary transition hover:bg-foreground/5 hover:text-foreground"
          onClick={handleShowAddTask}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
          </svg>
          Add task
        </button>
      </div>

      {showAddTask && <CreateTask dueDate="2026-12-06" onAddTask={handleAddTask} />}

      <ul className="mt-5 divide-y divide-default/[0.07]">
        {data?.tasks.map(task => (
          <TaskDetails
            task={task}
            key={task.id}
            onStatusChange={handleTaskStatusChange}
            onTitleChange={handleTaskTitleChange}
            onTaskRemove={handleTaskRemove}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
