import { useState } from 'react';

import { Task } from './TasksList';

type CreateTaskProps = {
  onAddTask: (_task: Task) => void;
  dueDate: string;
};

const CreateTask = ({ dueDate, onAddTask }: CreateTaskProps) => {
  const [title, setTitle] = useState('');
  const handleAddTask = () => {
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
  const handleTitleChange = (value: string) => setTitle(() => value);

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
        value={title}
        id="new-task"
        type="text"
        placeholder="What needs to be done?"
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground-faint"
      />
      <button
        disabled={!title.trim()}
        type="submit"
        className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:bg-foreground-muted/20 disabled:text-foreground-faint disabled:hover:bg-foreground-muted/20"
      >
        Add task
      </button>
    </form>
  );
};

export default CreateTask;
