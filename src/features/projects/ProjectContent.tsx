import { useState } from 'react';

import { Project } from '@pm/types';

import TaskList from '../tasks/TasksList';

import ProjectDetails from './ProjectDetails';

type ProjectContentProps = {
  projectData: Project;
};

const ProjectContent = ({ projectData }: ProjectContentProps) => {
  const [project, setProject] = useState<Project>(projectData);

  // todo: use a callback to save the data in db
  const handleProjectStatusChange = (status: Project['status']) => {
    setProject(currentProject => ({
      ...currentProject,
      status,
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <>
      <ProjectDetails project={project} onStatusChange={handleProjectStatusChange} />
      <TaskList projectId={project.id} projectDueDate={project.dueDate} />
    </>
  );
};

export default ProjectContent;
