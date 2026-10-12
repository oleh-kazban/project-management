import { useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';

import { Loader } from '@pm/ui';

import ProjectNotFoundState from './ProjectNotFoundState';
import ProjectNotSelectedState from './ProjectNotSelectedState';
import ProjectSplitPane from './ProjectSplitPane';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    enabled: !!projectId,
    queryFn: async ({ signal }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}`, {
        signal,
      });

      if (!response.ok)
        throw new Error(JSON.stringify({ code: 'PROJECT_NOT_FOUND', meta: { id: projectId } }));

      const project = await response.json();

      return { project };
    },
  });

  let ariaLabel;
  let component;

  if (!projectId) {
    ariaLabel = 'project-not-selected';
    component = <ProjectNotSelectedState />;
  } else if (isLoading) {
    ariaLabel = 'project-loading';
    component = <Loader />;
  } else if (error?.message === 'project-not-found' || (!isLoading && !data)) {
    ariaLabel = 'project-not-found';
    component = <ProjectNotFoundState />;
  } else {
    ariaLabel = 'project-details';
    component = <ProjectSplitPane key={data.project.id} projectData={data.project} />;
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

export default ProjectDetailsPage;
