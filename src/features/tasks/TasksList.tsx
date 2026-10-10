import { useState } from 'react';

import CreateTask from './CreateTask';
import TaskDetails from './TaskDetails';
import type { Task } from '../../types/task';
import { Status } from '../../types/status';

type TaskListProps = {
  onAddTask: (_task: Task) => void;
  onRemoveTask: (_taskId: Task['id']) => void;
  onTaskStatusChange: (_taskId: Task['id'], _status: Status) => void;
  tasks: Task[];
};

const TaskList = ({ tasks, onAddTask, onRemoveTask, onTaskStatusChange }: TaskListProps) => {
  const [showAddTask, setShowAddTask] = useState(false);

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

      {showAddTask && <CreateTask dueDate="2026-12-06" onAddTask={onAddTask} />}

      <ul className="mt-5 divide-y divide-default/[0.07]">
        {tasks.map(task => (
          <TaskDetails
            task={task}
            key={task.id}
            onStatusChange={status => onTaskStatusChange(task.id, status)}
            onTaskRemove={onRemoveTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
