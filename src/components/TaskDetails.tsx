import TaskStatusMenu from './TaskStatusMenu';
import type { Task } from '../types/task';
import { formatDateOnly } from '../utils/date-formatter';

type TaskDetailsProps = {
  task: Task;
  onStatusChange: (_status: Task['status']) => void;
  onTaskRemove: (_taskId: Task['id']) => void;
};

const TaskDetails = ({ task, onStatusChange, onTaskRemove }: TaskDetailsProps) => {
  const { title, dueDate, completedAt, status } = task;
  const date = completedAt
    ? `Completed ${formatDateOnly(completedAt)}`
    : dueDate
      ? `Due date: ${formatDateOnly(dueDate)}`
      : '';

  return (
    <li className="flex items-center gap-3 py-4">
      <div className="min-w-0 flex-1">
        <span
          className={`block text-sm text-foreground-muted ${status === 'completed' ? 'line-through' : undefined}`}
        >
          {title}
        </span>
        <span className="mt-1 block text-xs text-foreground-faint">{date}</span>
      </div>
      <TaskStatusMenu alignment="end" status={status} onStatusChange={onStatusChange} />
      <button
        type="button"
        onClick={() => onTaskRemove(task.id)}
        aria-label={`Remove ${task.title}`}
        className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground-subtle transition hover:bg-danger-surface/10 hover:text-danger"
      >
        Remove
      </button>
    </li>
  );
};

export default TaskDetails;
