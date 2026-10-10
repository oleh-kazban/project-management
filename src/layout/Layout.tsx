import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

import { useQuery } from '@tanstack/react-query';

import { ProjectsInfo } from '@pm/types';

import Header from './Header';
import Motivator from './Motivator';
import PageContainer from './PageContainer';
import Sidebar from './Sidebar';

const SIDEBAR_ID = 'app-sidebar';
const DESKTOP_QUERY = '(min-width: 1024px)';

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

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.matchMedia(DESKTOP_QUERY).matches,
  );
  const [motivationalQuote] = useState(
    () => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)],
  );

  useEffect(() => {
    if (!isSidebarOpen) {
      return undefined;
    }

    // Escape closes the drawer only where it overlays the content
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !window.matchMedia(DESKTOP_QUERY).matches) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  const { data } = useQuery({
    queryKey: ['projectsInfo'],
    enabled: true,
    queryFn: async ({ signal }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects?_embed=tasks`, {
        signal,
      });

      if (!response.ok) throw new Error(JSON.stringify({ code: 'PROJECTS_LOAD_FAILED' }));

      const projectsInfo: ProjectsInfo[] = await response.json();
      const projects = projectsInfo.map(({ title, id, tasks, status }) => ({
        title,
        id,
        status,
        tasks: tasks.length,
      }));

      return { projects };
    },
  });

  return (
    <>
      <div className="min-h-screen bg-canvas text-foreground">
        <div className="flex min-h-screen w-full">
          <Sidebar id={SIDEBAR_ID} isOpen={isSidebarOpen} items={data?.projects ?? []} />
          {isSidebarOpen && (
            <div
              aria-hidden="true"
              className="fixed inset-0 z-30 bg-canvas/70 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <main className="min-w-0 flex-1">
            <Header
              isSidebarOpen={isSidebarOpen}
              sidebarId={SIDEBAR_ID}
              onSidebarToggle={() => setIsSidebarOpen(isOpen => !isOpen)}
            />
            <PageContainer>
              <Outlet />
              <Motivator phrase={motivationalQuote} />
            </PageContainer>
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default Layout;
