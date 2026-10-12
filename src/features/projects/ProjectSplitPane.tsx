import { Project } from '@pm/types';

import TaskList from '../tasks/TasksList';

import ProjectInfoPane from './ProjectInfoPane';

type ProjectSplitPaneProps = {
  projectData: Project;
};

const ProjectSplitPane = ({ projectData }: ProjectSplitPaneProps) => {
  const { id, dueDate } = projectData;

  return (
    <>
      <ProjectInfoPane project={projectData} />
      <TaskList projectId={id} projectDueDate={dueDate} />
    </>
  );
};

export default ProjectSplitPane;
