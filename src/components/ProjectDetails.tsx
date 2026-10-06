import ProjectMetrics from './ProjectMetrics';

const ProjectDetails = () => {
  return (
    <div className="border-b border-white/10 p-5 sm:p-7 lg:p-8 xl:border-b-0 xl:border-r">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-200">
            In progress
          </span>
          <span className="text-xs text-slate-500">Updated 2 hours ago</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
            Due Dec 29, 2024
          </span>
          <button
            type="button"
            aria-label="More project actions"
            className="rounded-xl border border-white/10 p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
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
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          Learning React
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
          Learn React from the ground up. Start with the basics, finish with advanced knowledge, and
          put it all together in a project of your own.
        </p>
      </div>
      <ProjectMetrics />
    </div>
  );
};

export default ProjectDetails;
