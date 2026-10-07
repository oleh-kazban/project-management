import { useState } from 'react';

import { statusOptions } from '../constants/status-options';
import type { Task } from '../types/task';
import Confirmation from '../ui/Confirmation/Confirmation';
import FloatingMenu from '../ui/Menu/FloatingMenu';
import { formatDateOnly } from '../utils/date-formatter';

type TaskDetailsProps = {
  task: Task;
  onStatusChange: (_status: Task['status']) => void;
  onTaskRemove: (_taskId: Task['id']) => void;
};

const TaskDetails = ({ task, onStatusChange, onTaskRemove }: TaskDetailsProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const { title, dueDate, completedAt, status, id } = task;
  const date = completedAt
    ? `Completed ${formatDateOnly(completedAt)}`
    : dueDate
      ? `Due date: ${formatDateOnly(dueDate)}`
      : '';
  const handleDelete = () => {
    setIsConfirmationOpen(true);
  };

  return (
    <>
      <li className="flex items-center gap-3 py-4">
        <div className="min-w-0 flex-1">
          <span
            className={`block text-sm text-foreground-muted ${status === 'completed' ? 'line-through' : ''}`}
          >
            {title}
          </span>
          <span className="mt-1 block text-xs text-foreground-faint">{date}</span>
        </div>
        <FloatingMenu
          options={statusOptions}
          value={status}
          ariaLabel="Change task status"
          onChange={onStatusChange}
        />
        <button
          type="button"
          onClick={handleDelete}
          aria-label={`Delete ${task.title}`}
          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground-subtle transition hover:bg-danger-surface/10 hover:text-danger"
        >
          Delete
        </button>
      </li>
      {isConfirmationOpen && (
        <Confirmation
          title="Delete task?"
          description={`Task: ${title} will be deleted. This cannot be undone.`}
          confirmClassName="bg-danger text-danger-foreground hover:bg-danger/90"
          confirmLabel="Delete"
          onConfirm={() => {
            setIsConfirmationOpen(false);
            onTaskRemove(id);
          }}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      )}
    </>
  );
};

export default TaskDetails;
