import { useQuery } from '@tanstack/react-query';

import type { ProjectMetricData } from '@pm/types';
import type { Task } from '@pm/types';

import { getDaysRemaining } from '../../utils/date-utils';

import ProjectMetric from './ProjectMetric';

type ProjectMetricsProps = {
  projectId: string;
  dueDate: string;
};

const ProjectMetrics = ({ projectId, dueDate }: ProjectMetricsProps) => {
  const { data } = useQuery({
    queryKey: ['tasks', projectId],
    enabled: true,
    queryFn: async ({ signal }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, {
        signal,
      });

      if (!response.ok) throw new Error(`Can't fetch tasks`);

      const tasks: Task[] = await response.json();

      return { tasks };
    },
  });
  const completedTasks = data?.tasks.filter(task => task.status === 'completed').length;
  const progress =
    data?.tasks.length === 0 ? 0 : Math.round((completedTasks / data?.tasks.length) * 100);
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
        total: data?.tasks.length,
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
