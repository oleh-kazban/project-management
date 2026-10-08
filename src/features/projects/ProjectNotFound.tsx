import { Link } from 'react-router';

const ProjectNotFound = () => {
  return (
    <div
      role="alert"
      className="col-span-full flex flex-col items-center gap-3 p-10 text-center sm:p-14"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-foreground/5 text-foreground-subtle ring-1 ring-default/10">
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="m20 20-4-4M9 9l4 4m0-4-4 4" />
        </svg>
      </span>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">Project not found</h2>
      <p className="max-w-sm text-sm text-foreground-muted">
        This project doesn’t exist or may have been removed. Pick another one from the sidebar.
      </p>
      <Link
        to="/projects"
        className="mt-2 inline-flex items-center rounded-xl border border-accent/20 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent-soft transition hover:border-accent/40 hover:bg-accent/15"
      >
        Back to projects
      </Link>
    </div>
  );
};

export default ProjectNotFound;
