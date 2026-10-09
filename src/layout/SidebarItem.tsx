import { NavLink } from 'react-router';

import { Project } from '../types/project';
import SidebarItemAvatar from './SidebarItemAvatar';

export type SidebarItemProps = {
  title: string;
  tasks: number;
  id: string;
  status: Project['status'];
};

const SidebarItem = ({ title, tasks, id, status }: SidebarItemProps) => {
  const tasksLabel = tasks ? `${tasks} task${tasks > 1 ? 's' : ''}` : 'No tasks';
  const baseClasses = 'flex items-center gap-3 rounded-xl border px-3 py-3 text-sm';
  const activeClasses =
    'border-accent/15 bg-accent/[0.08] text-foreground shadow-[inset_2px_0_0_0_rgb(var(--color-accent))]';
  const inactiveClasses =
    'border-transparent text-foreground-muted transition hover:border-default/5 hover:bg-foreground/[0.04] hover:text-foreground-secondary';

  return (
    <NavLink
      to={`/projects/${id}`}
      aria-current="page"
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {({ isActive }) => (
        <>
          <SidebarItemAvatar title={title} status={status} />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium">{title}</span>
            <span className="mt-1 block text-xs text-foreground-subtle">{tasksLabel}</span>
          </span>
          {isActive && <span className="h-2 w-2 rounded-full bg-accent" />}
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;
