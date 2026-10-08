import DashboardGreeting from './DashboardGreeting';
import ProjectView from './ProjectView';

const ProjectsDashboard = () => {
  return (
    <>
      <DashboardGreeting username="Jordan" />
      <section
        aria-labelledby="project-title"
        className="grid w-full overflow-hidden rounded-2xl border border-default/10 bg-surface-raised shadow-2xl shadow-canvas/10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      >
        <ProjectView />
      </section>
    </>
  );
};

export default ProjectsDashboard;
