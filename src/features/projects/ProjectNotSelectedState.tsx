const ProjectNotSelected = () => {
  return (
    <div
      role="status"
      className="col-span-full flex flex-col items-center justify-center gap-3 p-10 text-center sm:p-14"
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
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path strokeLinecap="round" d="M9 3v18" />
        </svg>
      </span>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">No project selected</h2>
      <p className="max-w-sm text-sm text-foreground-muted">
        Please select a project from the sidebar to view its details.
      </p>
    </div>
  );
};

export default ProjectNotSelected;
