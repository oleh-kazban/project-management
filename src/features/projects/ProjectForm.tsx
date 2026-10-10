import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Project } from '@pm/types';
import { DatePicker } from '@pm/ui';

type ProjectData = {
  title: string;
  description: string;
  dueDate: string | undefined;
};

const ProjectForm = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['projectEdit', projectId],
    enabled: !!projectId,
    queryFn: async ({ signal }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}`, {
        signal,
      });

      if (!response.ok) throw new Error(`Can't load project details`);

      const project: Project = await response.json();

      return { project };
    },
  });
  const createProjectMutation = useMutation({
    mutationFn: async (payload: ProjectData | Project) => {
      const isEditing = 'id' in payload;
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/projects/${payload.id}`
        : `${import.meta.env.VITE_API_URL}/projects`;
      const method = isEditing ? 'PUT' : 'POST';
      const projectData: Project = isEditing
        ? { ...payload, updatedAt: new Date().toISOString() }
        : {
            ...payload,
            id: crypto.randomUUID(),
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: null,
          };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} project`);

      return response.json();
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projectsInfo'] });
      navigate(`/projects/${data.id}`);
    },
    onError: error => console.log(error),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectData>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: undefined,
    },
    values: data?.project,
  });

  const onSubmit = (formData: ProjectData) => {
    createProjectMutation.mutate(data?.project ? { ...data.project, ...formData } : formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-8 rounded-2xl border border-default/10 bg-surface-raised p-8 shadow-2xl shadow-canvas/10"
    >
      <div className="flex items-center gap-3 justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {projectId ? 'Edit Project' : 'Create Project'}
        </h2>
        <div className="flex gap-3">
          {' '}
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-medium text-foreground-muted transition hover:bg-foreground/5 hover:text-foreground-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createProjectMutation.isPending}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent-soft"
          >
            {data?.project ? 'Update' : 'Save'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Title
          </span>
          <input
            type="text"
            {...register('title', { required: 'Project title is required' })}
            className="mt-2 w-full rounded-xl border border-default/10 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/40"
          />
          {errors.title && (
            <span className="mt-1.5 block text-xs font-medium text-red-400">
              {errors.title.message}
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Description
          </span>
          <textarea
            rows={4}
            {...register('description', { required: 'Project description is required' })}
            className="mt-2 w-full resize-none rounded-xl border border-default/10 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/40"
          />
          {errors.description && (
            <span className="mt-1.5 block text-xs font-medium text-red-400">
              {errors.description.message}
            </span>
          )}
        </label>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Due date
          </span>
          <div className="mt-2 w-56">
            <Controller
              rules={{ required: 'Project due date is required' }}
              control={control}
              name="dueDate"
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  ariaLabel="Project due date"
                  placeholder="Select a due date..."
                  className="w-full"
                  triggerClassName="flex w-full justify-start rounded-xl border border-default/10 bg-foreground/[0.03] px-4 py-3 pr-10 text-sm text-foreground-secondary outline-none transition focus:border-accent/40 hover:bg-foreground/5"
                />
              )}
            />
          </div>
          {errors.dueDate && (
            <span className="mt-1.5 block text-xs font-medium text-red-400">
              {errors.dueDate.message}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
