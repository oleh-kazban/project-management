import { useState } from 'react';

import { Project } from '@pm/types';
import { Task } from '@pm/types';

import TaskList from '../tasks/TasksList';

import ProjectDetails from './ProjectDetails';

type ProjectContentProps = {
  projectData: Project;
  tasksData: Task[];
};

const ProjectContent = ({ projectData, tasksData }: ProjectContentProps) => {
  const [project, setProject] = useState<Project>(projectData);
  // const [tasks, setTasks] = useState<Task[]>(tasksData);

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
      <TaskList projectId={project.id} />
    </>
  );
};

export default ProjectContent;
