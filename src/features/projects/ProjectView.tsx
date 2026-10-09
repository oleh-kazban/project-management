import { useParams } from 'react-router';

import { projectsData, tasksData } from '../../constants/data';
import ProjectContent from './ProjectContent';
import ProjectNotFound from './ProjectNotFound';
import ProjectNotSelected from './ProjectNotSelected';

const ProjectView = () => {
  const { projectId } = useParams();
  const projectData = projectsData.find(project => project.id === projectId);
  const projectTasksData = tasksData.filter(task => task.projectId === projectId);

  let ariaLabel;
  let component;

  if (!projectId) {
    ariaLabel = 'project-not-selected';
    component = <ProjectNotSelected />;
  } else if (!projectData) {
    ariaLabel = 'project-not-found';
    component = <ProjectNotFound />;
  } else {
    ariaLabel = 'project-details';
    component = <ProjectContent projectData={projectData} tasksData={projectTasksData} />;
  }

  return (
    <section
      aria-labelledby={ariaLabel}
      className="grid w-full overflow-hidden rounded-2xl border border-default/10 bg-surface-raised shadow-2xl shadow-canvas/10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
    >
      {component}
    </section>
  );
};

export default ProjectView;
