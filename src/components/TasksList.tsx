import { type SetStateAction, useState } from 'react';

import CreateTask from './CreateTask';
import TaskDetails from './TaskDetails';

export type Task = {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'todo';
  completedAt?: string; // YYYY-MM-DD
  dueDate?: string; // YYYY-MM-DD
};

const tasksData = [
  {
    id: crypto.randomUUID(),
    title: 'Learn the basics of JSX',
    completedAt: '2026-10-06',
    status: 'completed',
  },
  {
    id: crypto.randomUUID(),
    title: 'Build reusable components',
    dueDate: '2026-11-06',
    status: 'in-progress',
  },
  {
    id: crypto.randomUUID(),
    title: 'Practice managing component state',
    dueDate: '2026-12-06',
    status: 'todo',
  },
] satisfies Task[];

type TaskListProps = {
  onTasksChange: () => void;
};

const TaskList = ({ onTasksChange }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [showAddTask, setShowAddTask] = useState(false);

  const updateTaskStatus = (taskId: Task['id'], status: SetStateAction<Task['status']>) => {
    setTasks(currentTasks =>
      currentTasks.map(task => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          status: typeof status === 'function' ? status(task.status) : status,
        };
      }),
    );
    onTasksChange();
  };
  const addTask = (task: Task) => {
    setTasks(previousTasks => [...previousTasks, task]);
    onTasksChange();
  };
  const removeTask = (taskId: Task['id']) => {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== taskId));
    onTasksChange();
  };
  const handleShowAddTask = () => setShowAddTask(() => !showAddTask);

  return (
    <div className="p-5 sm:p-7 lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">Tasks</h3>
            <span className="rounded-md bg-foreground/[0.06] px-2 py-0.5 text-xs text-foreground-muted">
              {tasks.length}
            </span>
          </div>
          <p className="mt-1 text-sm text-foreground-subtle">
            Break your project into small, actionable steps.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-default/10 px-3.5 py-2 text-sm font-medium text-foreground-secondary transition hover:bg-foreground/5 hover:text-foreground"
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

      {showAddTask && <CreateTask dueDate="2026-12-06" onAddTask={addTask} />}

      <ul className="mt-5 divide-y divide-default/[0.07]">
        {tasks.map(task => (
          <TaskDetails
            task={task}
            key={task.id}
            onStatusChange={status => updateTaskStatus(task.id, status)}
            onTaskRemove={removeTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
