import ProjectMetric from './ProjectMetric';

interface ProjectMetricBase {
  id: string;
  title: string;
}

interface CompletionMetric extends ProjectMetricBase {
  type: 'completion';
  value: { completed: number; total: number };
}

interface ProgressMetric extends ProjectMetricBase {
  type: 'progress';
  value: number;
}

interface TextMetric extends ProjectMetricBase {
  type: 'text';
  value: string;
}

export type ProjectMetricData = CompletionMetric | ProgressMetric | TextMetric;

const metricsData = [
  {
    id: crypto.randomUUID(),
    title: 'Tasks completed',
    type: 'completion',
    value: {
      completed: 1,
      total: 3,
    },
  },
  {
    id: crypto.randomUUID(),
    title: 'Progress',
    type: 'progress',
    value: 33,
  },
  {
    id: crypto.randomUUID(),
    title: 'Project timeline',
    type: 'text',
    value: '6 days remaining',
  },
] satisfies ProjectMetricData[];

const ProjectMetrics = () => {
  return (
    <div className="mt-7 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
      {metricsData.map(metric => (
        <ProjectMetric metric={metric} key={metric.id} />
      ))}
    </div>
  );
};

export default ProjectMetrics;
