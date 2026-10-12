import ProjectDashboardGreeting from './ProjectDashboardGreeting';
import ProjectDetailsPage from './ProjectDetailsPage';

const ProjectsDashboardPage = () => {
  return (
    <>
      <ProjectDashboardGreeting username="Jordan" />
      <ProjectDetailsPage />
    </>
  );
};

export default ProjectsDashboardPage;
