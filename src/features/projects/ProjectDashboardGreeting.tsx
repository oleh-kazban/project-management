import { formatLongDate } from '../../utils/date-formatter';
import { getGreeting } from '../../utils/greeting';

type DashboardGreetingProps = {
  username: string;
};

const ProjectDashboardGreeting = ({ username }: DashboardGreetingProps) => {
  const now = new Date();

  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-accent">{formatLongDate(now)}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {getGreeting(username, now)}
        </h1>
        <p className="mt-2 text-sm text-foreground-muted sm:text-base">
          Here’s what’s happening with your projects.
        </p>
      </div>
      <button
        type="button"
        className="hidden shrink-0 items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/10 transition hover:bg-accent-soft sm:inline-flex"
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
        New project
      </button>
    </div>
  );
};

export default ProjectDashboardGreeting;
