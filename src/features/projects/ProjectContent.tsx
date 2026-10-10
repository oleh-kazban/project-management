import { Project } from '@pm/types';

import TaskList from '../tasks/TasksList';

import ProjectDetails from './ProjectDetails';

type ProjectContentProps = {
  projectData: Project;
};

const ProjectContent = ({ projectData }: ProjectContentProps) => {
  const { id, dueDate } = projectData;

  return (
    <>
      <ProjectDetails project={projectData} />
      <TaskList projectId={id} projectDueDate={dueDate} />
    </>
  );
};

export default ProjectContent;
