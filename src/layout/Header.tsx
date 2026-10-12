import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useQuery } from '@tanstack/react-query';

import { Project } from '@pm/types';
import { Autosuggest, useDebounce } from '@pm/ui';

import UserProfile from './UserProfile';

type HeaderProps = {
  isSidebarOpen: boolean;
  sidebarId: string;
  onSidebarToggle: () => void;
};

const Header = ({ isSidebarOpen, sidebarId, onSidebarToggle }: HeaderProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const navigate = useNavigate();
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['projects', 'search', debouncedSearch],
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/projects?title_like=${encodeURIComponent(debouncedSearch)}`,
        { signal },
      );

      if (!res.ok) throw new Error(JSON.stringify({ code: 'PROJECTS_SEARCH_FAILED' }));

      return (await res.json()) as Project[];
    },
    enabled: debouncedSearch.trim().length >= 3,
  });

  return (
    <header className="flex h-[72px] items-center justify-between gap-3 border-b border-default/10 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-controls={sidebarId}
          aria-expanded={isSidebarOpen}
          onClick={onSidebarToggle}
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
        <nav
          aria-label="Breadcrumb"
          className="hidden items-center gap-2 text-sm text-foreground-subtle sm:flex"
        >
          <span>Workspace</span>
          <span className="text-foreground-faint">/</span>
          <span className="text-foreground-secondary">Projects</span>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <Autosuggest<Project>
          className="w-36 focus-within:w-60 sm:w-56 sm:focus-within:w-80 transition-[width] duration-300 ease-in-out"
          value={search}
          onChange={setSearch}
          items={searchResults}
          isLoading={isLoading}
          getOptionKey={project => project.id}
          getOptionLabel={project => project.title}
          renderOption={project => (
            <>
              <span className="truncate">{project.title}</span>
              {project.isArchived && (
                <span className="shrink-0 rounded-full border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
                  Archived
                </span>
              )}
            </>
          )}
          onSelect={project => {
            navigate(`/projects/${project.id}`);
            setSearch('');
          }}
          placeholder="Search projects..."
        />
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
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;
