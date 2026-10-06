import { useState } from 'react';

import Motivator from './components/Motivator';
import ProjectDetails from './components/ProjectDetails';
import TaskList from './components/TasksList';
import type { Project } from './types/project';

const motivationalQuotes = [
  'A little progress every day adds up.',
  'Done is better than perfect.',
  'The secret of getting ahead is getting started.',
  'Every great project is built one task at a time.',
  'Focus on being productive, not just busy.',
  'Small steps lead to massive achievements.',
  'Make it work, make it right, make it fast.',
  'Success is the sum of small efforts repeated daily.',
  "Don't stop when you're tired. Stop when you're done.",
];

const projectDetailsData = {
  id: crypto.randomUUID(),
  title: 'Learning React',
  description:
    'Learn React from the ground up. Start with the basics, finish with advanced knowledge, and put it all together in a project of your own.',
  createdAt: '2026-02-25', // YYYY-MM-DD
  dueDate: '2026-12-25', // YYYY-MM-DD
  status: 'in-progress',
} satisfies Project;

function App() {
  const [motivationalQuote, setMotivationalQuote] = useState(motivationalQuotes[0]);
  const updateMotivationalQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setMotivationalQuote(motivationalQuotes[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-canvas text-foreground">
      <header className="flex items-center justify-between border-b border-default/10 bg-surface px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation menu"
            className="rounded-lg border border-default/10 p-2 text-foreground-secondary transition hover:bg-foreground/5 hover:text-foreground"
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
          <a
            href="#"
            className="flex items-center gap-2 font-semibold tracking-tight text-foreground"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-strong/15 text-accent">
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
        <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/20 bg-accent/10 text-xs font-semibold text-accent-soft">
          JD
        </span>
      </header>

      <div className="flex min-h-screen w-full">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-default/10 bg-surface px-5 py-6 lg:flex">
          <a href="#" className="flex items-center gap-3 px-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-strong/15 text-accent ring-1 ring-accent/20">
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
              <span className="block font-semibold tracking-tight text-foreground">Focusboard</span>
              <span className="mt-0.5 block text-xs text-foreground-subtle">Project workspace</span>
            </span>
          </a>

          <div className="mt-9 flex items-center justify-between px-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground-subtle">
              Your projects
            </h2>
            <span className="rounded-md bg-foreground/5 px-2 py-1 text-[11px] font-medium text-foreground-muted">
              3
            </span>
          </div>

          <details className="group mt-4">
            <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-3 py-2.5 text-sm font-medium text-accent-soft transition hover:border-accent/40 hover:bg-accent/15 [&::-webkit-details-marker]:hidden">
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
            <form className="mt-3 space-y-3 rounded-xl border border-default/10 bg-surface-inset p-3">
              <label className="block text-xs font-medium text-foreground-muted">
                Project title
                <input
                  type="text"
                  placeholder="e.g. Website redesign"
                  className="mt-1.5 w-full rounded-lg border border-default/10 bg-foreground/[0.03] px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground-faint focus:border-accent/40"
                />
              </label>
              <label className="block text-xs font-medium text-foreground-muted">
                Description
                <textarea
                  rows={2}
                  placeholder="What is this project about?"
                  className="mt-1.5 w-full resize-none rounded-lg border border-default/10 bg-foreground/[0.03] px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground-faint focus:border-accent/40"
                />
              </label>
              <label className="block text-xs font-medium text-foreground-muted">
                Due date
                <input
                  type="date"
                  className="mt-1.5 w-full rounded-lg border border-default/10 bg-foreground/[0.03] px-3 py-2 text-sm text-foreground-secondary outline-none focus:border-accent/40"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent-soft"
              >
                Save project
              </button>
            </form>
          </details>

          <nav aria-label="Projects" className="mt-5 space-y-1.5">
            <a
              href="#"
              aria-current="page"
              className="flex items-center gap-3 rounded-xl border border-accent/15 bg-accent/[0.08] px-3 py-3 text-sm text-foreground shadow-[inset_2px_0_0_0_rgb(var(--color-accent))]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-xs font-semibold text-accent-soft">
                LR
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">Learning React</span>
                <span className="mt-1 block text-xs text-foreground-subtle">3 tasks</span>
              </span>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm text-foreground-muted transition hover:border-default/5 hover:bg-foreground/[0.04] hover:text-foreground-secondary"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-project-violet-surface/10 text-xs font-semibold text-project-violet">
                MR
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">Mastering React</span>
                <span className="mt-1 block text-xs text-foreground-faint">5 tasks</span>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm text-foreground-muted transition hover:border-default/5 hover:bg-foreground/[0.04] hover:text-foreground-secondary"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-warning-surface/10 text-xs font-semibold text-warning">
                WP
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">React Portfolio</span>
                <span className="mt-1 block text-xs text-foreground-faint">2 tasks</span>
              </span>
            </a>
          </nav>

          <div className="mt-auto border-t border-default/10 pt-5">
            <div className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-raised text-xs font-semibold text-foreground-secondary">
                JD
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground-secondary">
                  Jordan Davis
                </span>
                <span className="mt-0.5 block truncate text-xs text-foreground-subtle">
                  Personal workspace
                </span>
              </span>
              <button
                type="button"
                aria-label="More account options"
                className="ml-auto rounded-lg p-2 text-foreground-subtle hover:bg-foreground/5 hover:text-foreground-secondary"
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

          <div className="w-full px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-11 xl:px-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-accent">Monday, December 23</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Good morning, Jordan
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

            <section
              aria-labelledby="project-title"
              className="grid w-full overflow-hidden rounded-2xl border border-default/10 bg-surface-raised shadow-2xl shadow-canvas/10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
            >
              <ProjectDetails project={projectDetailsData} />
              <TaskList onTasksChange={updateMotivationalQuote} />
            </section>

            <Motivator phrase={motivationalQuote} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
