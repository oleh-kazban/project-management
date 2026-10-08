const Header = () => {
  return (
    <div className="hidden h-[72px] items-center justify-between border-b border-default/10 px-8 lg:flex xl:px-12">
      <div className="flex items-center gap-2 text-sm text-foreground-subtle">
        <span>Workspace</span>
        <span className="text-foreground-faint">/</span>
        <span className="text-foreground-secondary">Projects</span>
      </div>
      <div className="flex items-center gap-3">
        <label className="relative block">
          <span className="sr-only">Search projects and tasks</span>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-4-4" />
          </svg>
          <input
            type="search"
            placeholder="Search"
            className="w-56 rounded-xl border border-default/10 bg-foreground/[0.03] py-2 pl-9 pr-3 text-sm text-foreground-secondary outline-none placeholder:text-foreground-faint focus:border-accent/40"
          />
        </label>
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-default/10 p-2.5 text-foreground-muted transition hover:bg-foreground/5 hover:text-foreground"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"
            />
          </svg>
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/20 bg-accent/10 text-xs font-semibold text-accent-soft">
          JD
        </span>
      </div>
    </div>
  );
};

export default Header;
