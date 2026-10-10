import { type KeyboardEvent, useRef, useState } from 'react';

import { statusOptions } from '@pm/constants';
import type { Task } from '@pm/types';
import { Confirmation } from '@pm/ui';
import { FloatingMenu } from '@pm/ui';

import { formatDateOnly } from '../../utils/date-formatter';

type TaskDetailsProps = {
  task: Task;
  onStatusChange: (_task: Task, _status: Task['status']) => void;
  onTitleChange: (_task: Task, _title: Task['title']) => void;
  onTaskRemove: (_taskId: Task['id']) => void;
};

const TaskDetails = ({ task, onStatusChange, onTitleChange, onTaskRemove }: TaskDetailsProps) => {
  const { title, dueDate, completedAt, status, id } = task;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const date =
    status !== 'completed'
      ? `Due date: ${formatDateOnly(dueDate)}`
      : `Completed ${formatDateOnly(completedAt)}`;

  const handleDelete = () => {
    setIsConfirmationOpen(true);
  };

  const handleSave = () => {
    const newValue = inputRef.current?.value.trim();

    if (newValue && newValue !== title) {
      onTitleChange(task, newValue);
    }
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <>
      <li className="py-4">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            {isEditing && (
              <input
                ref={inputRef}
                type="text"
                autoFocus
                defaultValue={title}
                onKeyDown={handleKeyDown}
                className="w-full rounded-xl border border-default/10 bg-surface-inset px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent/40"
              />
            )}
            {!isEditing && (
              <span
                className={`block text-sm text-foreground-muted ${status === 'completed' ? 'line-through' : ''}`}
              >
                {title}
              </span>
            )}
          </div>
          <FloatingMenu
            options={statusOptions}
            value={status}
            ariaLabel="Change task status"
            onChange={value => onStatusChange(task, value)}
          />
          <button
            type="button"
            aria-label={`${isEditing ? 'Save' : 'Edit'} ${title}`}
            onClick={() => (isEditing ? handleSave() : handleStartEdit())}
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground-subtle transition hover:bg-foreground/5 hover:text-foreground"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            aria-label={`Delete ${task.title}`}
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground-subtle transition hover:bg-danger-surface/10 hover:text-danger"
          >
            Delete
          </button>
        </div>
        <div className="mt-1">
          <span className="block text-xs text-foreground-faint">{date}</span>
        </div>
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
