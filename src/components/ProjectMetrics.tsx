import ProjectMetric from './ProjectMetric';
import type { ProjectMetricData } from '../types/project-metric';
import type { Task } from '../types/task';
import { getDaysRemaining } from '../utils/date-utils';

type ProjectMetricsProps = {
  tasks: Task[];
  dueDate: string;
};

const ProjectMetrics = ({ tasks, dueDate }: ProjectMetricsProps) => {
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const progress = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);
  const daysRemaining = getDaysRemaining(dueDate);
  const timelineText =
    daysRemaining < 0
      ? `${Math.abs(daysRemaining)} day${daysRemaining === -1 ? '' : 's'} overdue`
      : daysRemaining === 0
        ? 'Due today'
        : `${daysRemaining} day${daysRemaining === 1 ? '' : 's'} remaining`;
  const metricsData = [
    {
      id: 'tasks-completed',
      title: 'Tasks completed',
      type: 'completion',
      value: {
        completed: completedTasks,
        total: tasks.length,
      },
    },
    {
      id: 'progress',
      title: 'Progress',
      type: 'progress',
      value: progress,
    },
    {
      id: 'project-timeline',
      title: 'Project timeline',
      type: 'text',
      value: timelineText,
    },
  ] satisfies ProjectMetricData[];

  return (
    <div className="mt-7 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
      {metricsData.map(metric => (
        <ProjectMetric metric={metric} key={metric.id} />
      ))}
    </div>
  );
};

export default ProjectMetrics;
