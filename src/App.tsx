import { useState } from 'react';

import ProjectsDashboard from './features/projects/ProjectsDashboard';
import Header from './layout/Header';
import Layout from './layout/Layout';
import Motivator from './layout/Motivator';
import Sidebar from './layout/Sidebar';

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

// TODO: Bind with the global state later
// const updateMotivationalQuote = () => {
//   const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
//   setMotivationalQuote(motivationalQuotes[randomIndex]);
// };

function App() {
  const [motivationalQuote] = useState(
    () => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)],
  );

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
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Header />
          <Layout>
            <ProjectsDashboard />
            <Motivator phrase={motivationalQuote} />
          </Layout>
        </main>
      </div>
    </div>
  );
}

export default App;
