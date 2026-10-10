import { useState } from 'react';

import { DatePicker } from '@pm/ui';

const ProjectForm = () => {
  const [dueDate, setDueDate] = useState<string | undefined>();

  return (
    <form className="w-full space-y-8 rounded-2xl border border-default/10 bg-surface-raised p-8 shadow-2xl shadow-canvas/10">
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          className="rounded-lg px-4 py-2 text-sm font-medium text-foreground-muted transition hover:bg-foreground/5 hover:text-foreground-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent-soft"
        >
          Save
        </button>
      </div>

      <div className="space-y-6">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Title
          </span>
          <input
            type="text"
            className="mt-2 w-full rounded-xl border border-default/10 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/40"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Description
          </span>
          <textarea
            rows={4}
            className="mt-2 w-full resize-none rounded-xl border border-default/10 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/40"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Due date
          </span>
          <DatePicker
            value={dueDate}
            onChange={setDueDate}
            ariaLabel="Project due date"
            placeholder="Select a due date..."
            className="block w-full"
            triggerClassName="mt-2 w-full justify-start rounded-xl border border-default/10 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground-secondary outline-none transition focus:border-accent/40 hover:bg-foreground/5"
          />
        </label>
      </div>
    </form>
  );
};

export default ProjectForm;
