import { useNavigate } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Project } from '@pm/types';
import { DotsFloatingMenu, DotsFloatingMenuOption } from '@pm/ui';
import { FloatingMenu } from '@pm/ui';

import { statusOptions } from '../../constants/status-options';
import { formatDateOnly } from '../../utils/date-formatter';
import { getUpdateDateLabel } from '../../utils/date-utils';

import ProjectMetrics from './ProjectMetrics';

type ProjectProps = {
  project: Project;
};

const ProjectDetails = ({ project }: ProjectProps) => {
  const { id, title, description, dueDate, updatedAt, status } = project;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleEdit = () => {
    navigate(`/projects/${project.id}/edit`);
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
  const handleStatusChange = value => {
    updateProjectStatusChange.mutate(value);
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

  const updateProjectStatusChange = useMutation({
    mutationFn: async (status: string) => {
      const payload = { ...project, status, updatedAt: new Date().toISOString() };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Can't update project status`);

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
    onError: error => {
      console.log('Error: ', error);
    },
  });

  return (
    <div className="border-b border-default/10 p-5 sm:p-7 lg:p-8 xl:border-b-0 xl:border-r">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <FloatingMenu
            alignment="start"
            options={statusOptions}
            value={status}
            ariaLabel="Change project status"
            onChange={handleStatusChange}
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
      <ProjectMetrics dueDate={project.dueDate} projectId={project.id} />
    </div>
  );
};

export default ProjectDetails;
