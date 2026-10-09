import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import ProjectContent from './ProjectContent';
import ProjectNotFound from './ProjectNotFound';
import ProjectNotSelected from './ProjectNotSelected';

const ProjectView = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [projectTasksData, setProjectTasksData] = useState([]);

  useEffect(() => {
    if (!projectId) return;

    fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}`)
      .then(res => res.json())
      .then(data => setProjectData(data));
    fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`)
      .then(res => res.json())
      .then(data => setProjectTasksData(data));
  }, [projectId]);

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
    component = (
      <ProjectContent key={projectData.id} projectData={projectData} tasksData={projectTasksData} />
    );
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
