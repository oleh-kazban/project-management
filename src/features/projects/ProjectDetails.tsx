import type { Project } from '@pm/types';
import type { Task } from '@pm/types';
import { DotsFloatingMenu,  DotsFloatingMenuOption  } from '@pm/ui';
import { FloatingMenu } from '@pm/ui';

import { statusOptions } from '../../constants/status-options';
import { formatDateOnly } from '../../utils/date-formatter';
import { getUpdateDateLabel } from '../../utils/date-utils';

import ProjectMetrics from './ProjectMetrics';

type ProjectProps = {
  project: Project;
  tasks: Task[];
  onStatusChange: (_status: Project['status']) => void;
};

const ProjectDetails = ({ project, tasks, onStatusChange }: ProjectProps) => {
  const { title, description, dueDate, updatedAt, status } = project;
  const handleEdit = () => {
    console.log('handleEdit');
  };
  const handleDelete = () => {
    console.log('handleDelete');
  };
  const handleDuplicate = () => {
    console.log('handleDuplicate');
  };
  const handleArchive = () => {
    console.log('handleArchive');
  };
  const projectActionsOptions = [
    { label: 'Edit', onSelect: handleEdit },
    { label: 'Duplicate', onSelect: handleDuplicate },
    { label: 'Archive', onSelect: handleArchive },
    {
      label: 'Delete',
      onSelect: handleDelete,
      className: 'text-danger hover:bg-danger-surface/10',
    },
  ] satisfies DotsFloatingMenuOption[];

  return (
    <div className="border-b border-default/10 p-5 sm:p-7 lg:p-8 xl:border-b-0 xl:border-r">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <FloatingMenu
            alignment="start"
            options={statusOptions}
            value={status}
            ariaLabel="Change project status"
            onChange={onStatusChange}
          />
          <span className="text-xs text-foreground-subtle">
            Updated {getUpdateDateLabel(updatedAt)}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-xl border border-default/10 bg-foreground/[0.03] px-3 py-2 text-xs text-foreground-muted">
            Due date: {formatDateOnly(dueDate)}
          </span>
          <DotsFloatingMenu options={projectActionsOptions} ariaLabel="Project actions" />
        </div>
      </div>
      <div className="mt-5">
        <h2
          id="project-title"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-foreground-muted sm:text-base">{description}</p>
      </div>
      <ProjectMetrics dueDate={project.dueDate} tasks={tasks} />
    </div>
  );
};

export default ProjectDetails;
