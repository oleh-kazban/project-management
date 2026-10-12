import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { statusOptions } from '@pm/constants';
import type { Project } from '@pm/types';
import { Confirmation, DotsFloatingMenu, DotsFloatingMenuOption, FloatingMenu } from '@pm/ui';
import { appToast, formatDateOnly, getUpdateDateLabel } from '@pm/utils';

import ProjectMetricsGrid from './ProjectMetricsGrid';

type ProjectInfoPaneProps = {
  project: Project;
};

const ProjectInfoPane = ({ project }: ProjectInfoPaneProps) => {
  const { id, title, description, dueDate, updatedAt, status, isArchived, archivedAt, createdAt } =
    project;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isArchiveConfirmationOpen, setIsArchiveConfirmationOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/projects/${project.id}/edit`);
  };
  const handleDelete = () => {
    setIsDeleteConfirmationOpen(true);
  };
  const handleDuplicate = () => {
    duplicateProjectMutation.mutate();
  };
  const handleArchive = () => {
    setIsArchiveConfirmationOpen(true);
  };
  const handleRestore = () => {
    restoreMutation.mutate();
  };
  const handleStatusChange = value => {
    updateProjectStatusChange.mutate(value);
  };

  const onProjectDelete = () => {
    deleteProjectMutation.mutate();
  };
  const onProjectArchive = () => {
    archiveMutation.mutate();
  };

  const projectActionsOptions = [
    { label: 'Edit', onSelect: handleEdit },
    { label: 'Duplicate', onSelect: handleDuplicate },
    project.isArchived
      ? {
          label: 'Restore',
          onSelect: handleRestore,
        }
      : {
          label: 'Archive',
          onSelect: handleArchive,
        },
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

      if (!response.ok) throw new Error(JSON.stringify({ code: 'PROJECT_STATUS_UPDATE_FAILED' }));

      return response.json();
    },
    onSuccess: () => {
      appToast.success('Status updated', 'The project status was changed successfully.');
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  const deleteProjectMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok)
        throw new Error(JSON.stringify({ code: 'PROJECT_DELETE_FAILED', meta: { id } }));

      return response.json();
    },
    onSuccess: () => {
      appToast.success('Project deleted', 'The project was deleted successfully.');
      queryClient.removeQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projectsInfo'] });

      navigate('/projects');
    },
  });
  const duplicateProjectMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...project,
        id: crypto.randomUUID(),
        title: `Copy ${project.title}`,
        updatedAt: null,
        createdAt: new Date().toISOString(),
        isArchived: false,
        archivedAt: null,
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new Error(JSON.stringify({ code: 'PROJECT_COPY_FAILED', meta: { id } }));

      return response.json();
    },
    onSuccess: () => {
      appToast.success('Project copied', 'The project was copied successfully.');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projectsInfo'] });
    },
  });
  const archiveMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isArchived: true, archivedAt: new Date().toISOString() }),
      });

      if (!response.ok)
        throw new Error(JSON.stringify({ code: 'PROJECT_ARCHIVE_FAILED', meta: { id } }));
      return response.json();
    },
    onSuccess: () => {
      appToast.success(`Project archived`, `The project was archived successfully.`);
      queryClient.removeQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['projectsInfo'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });

      navigate('/projects');
    },
  });
  const restoreMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isArchived: false, archivedAt: null }),
      });

      if (!response.ok)
        throw new Error(JSON.stringify({ code: 'PROJECT_RESTORE_FAILED', meta: { id } }));
      return response.json();
    },
    onSuccess: () => {
      appToast.success(`Project restored`, `The project was restored successfully.`);
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['projectsInfo'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
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
          {isArchived && (
            <>
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                Archived
              </span>
              {archivedAt && (
                <span className="text-xs text-foreground-subtle">
                  Archived {getUpdateDateLabel(archivedAt)}
                </span>
              )}
            </>
          )}
          {!isArchived && (
            <span className="text-xs text-foreground-subtle">
              {updatedAt
                ? `Updated ${getUpdateDateLabel(updatedAt)}`
                : `Created ${getUpdateDateLabel(createdAt)}`}
            </span>
          )}
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
      <ProjectMetricsGrid dueDate={project.dueDate} projectId={project.id} />
      {isDeleteConfirmationOpen && (
        <Confirmation
          title="Delete project?"
          description={`Project: ${title} will be deleted. This cannot be undone.`}
          confirmClassName="bg-danger text-danger-foreground hover:bg-danger/90"
          confirmLabel="Delete"
          onConfirm={() => {
            setIsDeleteConfirmationOpen(false);
            onProjectDelete();
          }}
          onCancel={() => setIsDeleteConfirmationOpen(false)}
        />
      )}
      {isArchiveConfirmationOpen && (
        <Confirmation
          title="Archive project?"
          description={`Project: ${title} will be archived. This cannot be undone from UI.`}
          confirmClassName="bg-danger text-danger-foreground hover:bg-danger/90"
          confirmLabel="Archive"
          onConfirm={() => {
            setIsArchiveConfirmationOpen(false);
            onProjectArchive();
          }}
          onCancel={() => setIsArchiveConfirmationOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectInfoPane;
