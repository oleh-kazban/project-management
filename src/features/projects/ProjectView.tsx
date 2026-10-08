import { useParams } from 'react-router';

import { projectsData, tasksData } from './data';
import ProjectContent from './ProjectContent';
import ProjectNotFound from './ProjectNotFound';
import ProjectNotSelected from './ProjectNotSelected';

const presentationStates = {
  'not-selected': {
    ariaLabel: 'project-not-selected',
    Component: ProjectNotSelected,
  },
  'not-found': {
    ariaLabel: 'project-not-found',
    Component: ProjectNotFound,
  },
  'project-details': {
    ariaLabel: 'project-details',
    Component: ProjectContent,
  },
};

const ProjectView = () => {
  const { projectId } = useParams();
  const projectData = projectsData.find(project => project.id === projectId);
  const { ariaLabel, Component } = !projectId
    ? presentationStates['not-selected']
    : !projectData
      ? presentationStates['not-found']
      : presentationStates['project-details'];

  console.log('project id: ', projectId);
  console.log('project data: ', projectData);

  return (
    <section
      aria-labelledby={ariaLabel}
      className="grid w-full overflow-hidden rounded-2xl border border-default/10 bg-surface-raised shadow-2xl shadow-canvas/10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
    >
      <Component projectData={projectData} tasksData={tasksData} />
    </section>
  );
};

export default ProjectView;
