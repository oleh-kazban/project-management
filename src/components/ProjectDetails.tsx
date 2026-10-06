import ProjectMetrics from './ProjectMetrics';
import type { Project } from '../types/project';
import type { Task } from '../types/task';
import { formatDateOnly } from '../utils/date-formatter';
import { getUpdateDateLabel } from '../utils/date-utils';

type projectProps = {
  project: Project;
  tasks: Task[];
};
const ProjectDetails = ({ project, tasks }: projectProps) => {
  const { title, description, dueDate, updatedAt } = project;

  return (
    <div className="border-b border-default/10 p-5 sm:p-7 lg:p-8 xl:border-b-0 xl:border-r">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-soft">
            In progress
          </span>
          <span className="text-xs text-foreground-subtle">
            Updated {getUpdateDateLabel(updatedAt)}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-xl border border-default/10 bg-foreground/[0.03] px-3 py-2 text-xs text-foreground-muted">
            Due date: {formatDateOnly(dueDate)}
          </span>
          <button
            type="button"
            aria-label="More project actions"
            className="rounded-xl border border-default/10 p-2.5 text-foreground-muted transition hover:bg-foreground/5 hover:text-foreground"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>
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
