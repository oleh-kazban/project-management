function App() {
  return (
    <div className="min-h-screen bg-[#0b0f16] text-slate-100">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#101620] px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation menu"
            className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-400/15 text-cyan-300">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
              </svg>
            </span>
            Focusboard
          </a>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
          JD
        </span>
      </header>

      <div className="flex min-h-screen w-full">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-white/10 bg-[#101620] px-5 py-6 lg:flex">
          <a href="#" className="flex items-center gap-3 px-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/20">
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
              </svg>
            </span>
            <span>
              <span className="block font-semibold tracking-tight text-white">Focusboard</span>
              <span className="mt-0.5 block text-xs text-slate-500">Project workspace</span>
            </span>
          </a>

          <div className="mt-9 flex items-center justify-between px-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Your projects
            </h2>
            <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-400">
              3
            </span>
          </div>

          <details className="group mt-4">
            <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2.5 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/15 [&::-webkit-details-marker]:hidden">
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
              Create project
            </summary>
            <form className="mt-3 space-y-3 rounded-xl border border-white/10 bg-[#0d131c] p-3">
              <label className="block text-xs font-medium text-slate-400">
                Project title
                <input
                  type="text"
                  placeholder="e.g. Website redesign"
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/40"
                />
              </label>
              <label className="block text-xs font-medium text-slate-400">
                Description
                <textarea
                  rows={2}
                  placeholder="What is this project about?"
                  className="mt-1.5 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/40"
                />
              </label>
              <label className="block text-xs font-medium text-slate-400">
                Due date
                <input
                  type="date"
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 outline-none focus:border-cyan-300/40"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-lg bg-cyan-300 px-3 py-2 text-sm font-semibold text-[#071016] transition hover:bg-cyan-200"
              >
                Save project
              </button>
            </form>
          </details>

          <nav aria-label="Projects" className="mt-5 space-y-1.5">
            <a
              href="#"
              aria-current="page"
              className="flex items-center gap-3 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.08] px-3 py-3 text-sm text-white shadow-[inset_2px_0_0_0_rgb(103_232_249)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-xs font-semibold text-cyan-200">
                LR
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">Learning React</span>
                <span className="mt-1 block text-xs text-slate-500">3 tasks</span>
              </span>
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm text-slate-400 transition hover:border-white/5 hover:bg-white/[0.04] hover:text-slate-200"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-violet-400/10 text-xs font-semibold text-violet-200">
                MR
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">Mastering React</span>
                <span className="mt-1 block text-xs text-slate-600">5 tasks</span>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm text-slate-400 transition hover:border-white/5 hover:bg-white/[0.04] hover:text-slate-200"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-400/10 text-xs font-semibold text-amber-200">
                WP
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">React Portfolio</span>
                <span className="mt-1 block text-xs text-slate-600">2 tasks</span>
              </span>
            </a>
          </nav>

          <div className="mt-auto border-t border-white/10 pt-5">
            <div className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-700 text-xs font-semibold text-slate-200">
                JD
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-slate-200">
                  Jordan Davis
                </span>
                <span className="mt-0.5 block truncate text-xs text-slate-500">
                  Personal workspace
                </span>
              </span>
              <button
                type="button"
                aria-label="More account options"
                className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-slate-300"
              >
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="hidden h-[72px] items-center justify-between border-b border-white/10 px-8 lg:flex xl:px-12">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Workspace</span>
              <span className="text-slate-700">/</span>
              <span className="text-slate-300">Projects</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative block">
                <span className="sr-only">Search projects and tasks</span>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
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
                  className="w-56 rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-300/40"
                />
              </label>
              <button
                type="button"
                aria-label="Notifications"
                className="relative rounded-xl border border-white/10 p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
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
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </button>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                JD
              </span>
            </div>
          </div>

          <div className="w-full px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-11 xl:px-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-cyan-300">Monday, December 23</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Good morning, Jordan
                </h1>
                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                  Here’s what’s happening with your projects.
                </p>
              </div>
              <button
                type="button"
                className="hidden shrink-0 items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-[#071016] shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-200 sm:inline-flex"
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

            <section
              aria-labelledby="project-title"
              className="grid w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111823] shadow-2xl shadow-black/10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
            >
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
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
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
                    Learn React from the ground up. Start with the basics, finish with advanced
                    knowledge, and put it all together in a project of your own.
                  </p>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <p className="text-xs font-medium text-slate-500">Tasks completed</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      1 <span className="text-sm font-medium text-slate-500">of 3</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <p className="text-xs font-medium text-slate-500">Progress</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700/70">
                        <div className="h-full w-1/3 rounded-full bg-cyan-300" />
                      </div>
                      <span className="text-sm font-semibold text-slate-200">33%</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <p className="text-xs font-medium text-slate-500">Project timeline</p>
                    <p className="mt-2 text-sm font-semibold text-slate-200">6 days remaining</p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7 lg:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">Tasks</h3>
                      <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-xs text-slate-400">
                        3
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      Break your project into small, actionable steps.
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-sm font-medium text-slate-300">
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
                    Add task
                  </span>
                </div>

                <form className="mt-5 flex flex-col gap-2 rounded-xl border border-white/10 bg-[#0d131c] p-2 sm:flex-row">
                  <label className="sr-only" htmlFor="new-task">
                    New task name
                  </label>
                  <input
                    id="new-task"
                    type="text"
                    placeholder="What needs to be done?"
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-[#071016] transition hover:bg-cyan-200"
                  >
                    Add task
                  </button>
                </form>

                <ul className="mt-5 divide-y divide-white/[0.07]">
                  <li className="flex items-center gap-3 py-4">
                    <input
                      id="task-jsx"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-800 accent-cyan-300"
                    />
                    <label htmlFor="task-jsx" className="min-w-0 flex-1">
                      <span className="block text-sm text-slate-500 line-through">
                        Learn the basics of JSX
                      </span>
                      <span className="mt-1 block text-xs text-slate-600">Completed yesterday</span>
                    </label>
                    <span className="hidden rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300 sm:inline-flex">
                      Complete
                    </span>
                    <button
                      type="button"
                      aria-label="Remove Learn the basics of JSX"
                      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  </li>
                  <li className="flex items-center gap-3 py-4">
                    <input
                      id="task-components"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-800 accent-cyan-300"
                    />
                    <label htmlFor="task-components" className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-slate-200">
                        Build reusable components
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">Due Dec 26</span>
                    </label>
                    <span className="hidden rounded-full bg-amber-300/10 px-2.5 py-1 text-xs font-medium text-amber-200 sm:inline-flex">
                      In progress
                    </span>
                    <button
                      type="button"
                      aria-label="Remove Build reusable components"
                      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  </li>
                  <li className="flex items-center gap-3 py-4">
                    <input
                      id="task-state"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-800 accent-cyan-300"
                    />
                    <label htmlFor="task-state" className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-slate-200">
                        Practice managing component state
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">Due Dec 29</span>
                    </label>
                    <span className="hidden rounded-full bg-slate-400/10 px-2.5 py-1 text-xs font-medium text-slate-400 sm:inline-flex">
                      To do
                    </span>
                    <button
                      type="button"
                      aria-label="Remove Practice managing component state"
                      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  </li>
                </ul>
              </div>
            </section>

            <p className="mt-5 text-center text-xs text-slate-600">
              A little progress every day adds up.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
