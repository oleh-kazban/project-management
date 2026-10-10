import { useState } from 'react';

import ProjectDetails from './ProjectDetails';
import { Project } from '../../types/project';
import { Task } from '../../types/task';
import TaskList from '../tasks/TasksList';
import { Status } from '../../types/status';

type ProjectContentProps = {
  projectData: Project;
  tasksData: Task[];
};

const ProjectContent = ({ projectData, tasksData }: ProjectContentProps) => {
  const [project, setProject] = useState<Project>(projectData);
  const [tasks, setTasks] = useState<Task[]>(tasksData);

  const handleProjectStatusChange = (status: Project['status']) => {
    setProject(currentProject => ({
      ...currentProject,
      status,
      updatedAt: new Date().toISOString(),
    }));
  };
  const handleAddTask = (task: Task) => {
    setTasks(previousTasks => [...previousTasks, task]);
  };
  const handleRemoveTask = (taskId: Task['id']) => {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== taskId));
  };
  const handleTaskStatusChange = (taskId: Task['id'], status: Status) => {
    setTasks(currentTasks =>
      currentTasks.map(task => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          status,
        };
      }),
    );
  };

  return (
    <>
      <ProjectDetails project={project} tasks={tasks} onStatusChange={handleProjectStatusChange} />
      <TaskList
        tasks={tasks}
        onAddTask={handleAddTask}
        onRemoveTask={handleRemoveTask}
        onTaskStatusChange={handleTaskStatusChange}
      />
    </>
  );
};

export default ProjectContent;
