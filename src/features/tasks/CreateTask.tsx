import { FormEvent, KeyboardEvent, useState } from 'react';

import type { Task } from '@pm/types';

type CreateTaskProps = {
  onAddTask: (_task: Omit<Task, 'projectId' | 'completedAt' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  dueDate: string;
};

const CreateTask = ({ dueDate, onAddTask, onCancel }: CreateTaskProps) => {
  const [title, setTitle] = useState('');
  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    onAddTask({
      id: crypto.randomUUID(),
      title,
      status: 'todo',
      dueDate,
    });
    setTitle('');
  };
  const handleTitleChange = (value: string) => setTitle(value);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <form
      className="mt-5 flex flex-col gap-2 rounded-xl border border-default/10 bg-surface-inset p-2 sm:flex-row"
      onSubmit={handleAddTask}
    >
      <label className="sr-only" htmlFor="new-task">
        New task name
      </label>
      <input
        onChange={event => handleTitleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        value={title}
        id="new-task"
        type="text"
        placeholder="What needs to be done?"
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground-faint"
      />
      <button
        disabled={!title.trim()}
        type="submit"
        className="shrink-0 whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:bg-foreground-muted/20 disabled:text-foreground-faint disabled:hover:bg-foreground-muted/20"
      >
        Add task
      </button>
    </form>
  );
};

export default CreateTask;
