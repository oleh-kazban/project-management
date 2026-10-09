import { Link } from 'react-router';

import SidebarItem, { type SidebarItemProps } from './SidebarItem';
import UserProfile from './UserProfile';

type SidebarProps = {
  id: string;
  isOpen: boolean;
  items: SidebarItemProps[];
};

// Below `lg` the sidebar is a drawer over the content, from `lg` up it is part of the page flow
const Sidebar = ({ id, isOpen, items }: SidebarProps) => {
  return (
    <aside
      id={id}
      aria-label="Projects navigation"
      className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-default/10 bg-surface px-5 py-6 transition-all duration-300 ease-in-out lg:static lg:z-auto ${isOpen ? 'ml-0' : '-ml-72'}`}
    >
      <Link to="/projects" className="flex items-center gap-3 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-strong/15 text-accent ring-1 ring-accent/20">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
          </svg>
        </span>
        <span>
          <span className="block font-semibold tracking-tight text-foreground">Focusboard</span>
          <span className="mt-0.5 block text-xs text-foreground-subtle">Project workspace</span>
        </span>
      </Link>

      <div className="mt-9 flex items-center justify-between px-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground-subtle">
          Your projects
        </h2>
        <span className="rounded-md bg-foreground/5 px-2 py-1 text-[11px] font-medium text-foreground-muted">
          {items.length}
        </span>
      </div>

      <Link
        to="projects/create"
        className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-3 py-2.5 text-sm font-medium text-accent-soft transition hover:border-accent/40 hover:bg-accent/15"
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
        Create project
      </Link>

      <nav aria-label="Projects" className="mt-5 space-y-1.5">
        {items.map(({ id, title, tasks, status }) => (
          <SidebarItem key={id} id={id} title={title} tasks={tasks} status={status} />
        ))}
      </nav>

      <div className="mt-auto border-t border-default/10 pt-5">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <UserProfile className="bg-surface-raised text-foreground-secondary" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-foreground-secondary">
              Jordan Davis
            </span>
            <span className="mt-0.5 block truncate text-xs text-foreground-subtle">
              Personal workspace
            </span>
          </span>
          <button
            type="button"
            aria-label="More account options"
            className="ml-auto rounded-lg p-2 text-foreground-subtle hover:bg-foreground/5 hover:text-foreground-secondary"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
