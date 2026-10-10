import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import ProjectContent from './ProjectContent';
import ProjectNotFound from './ProjectNotFound';
import ProjectNotSelected from './ProjectNotSelected';
import { Project } from '../../types/project';
import { Task } from '../../types/task';
import Loader from '../../ui/Loader/Loader';

const ProjectView = () => {
  const { projectId } = useParams();

  // Track projectId to reset state during render when it changes
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [projectTasksData, setProjectTasksData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(!!projectId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const controller = new AbortController();
    const { signal } = controller;

    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}`, { signal }).then(res => {
        if (!res.ok) throw new Error('project-not-found');
        return res.json();
      }),
      fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, { signal }).then(res => {
        if (!res.ok) throw new Error('tasks-fetch-error');
        return res.json();
      }),
    ])
      .then(([project, tasks]) => {
        setProjectData(project);
        setProjectTasksData(tasks);
        setIsLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch data:', err);
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [projectId]);

  let ariaLabel;
  let component;

  if (!projectId) {
    ariaLabel = 'project-not-selected';
    component = <ProjectNotSelected />;
  } else if (isLoading) {
    ariaLabel = 'project-loading';
    component = <Loader />;
  } else if (error === 'project-not-found' || !projectData) {
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
