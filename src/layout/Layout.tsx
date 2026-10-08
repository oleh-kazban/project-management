import { useEffect, useState } from 'react';

import { Outlet } from 'react-router';

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

  return (
    <div className="min-h-screen bg-canvas text-foreground">
      <div className="flex min-h-screen w-full">
        <Sidebar id={SIDEBAR_ID} isOpen={isSidebarOpen} />
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
  );
};

export default Layout;
