import type { ProjectMetricData } from '@pm/types';

type ProjectMetricProps = {
  metric: ProjectMetricData;
};

const ProjectMetric = ({ metric }: ProjectMetricProps) => {
  const { title, type, value } = metric;

  return (
    <div className="rounded-xl border border-subtle/10 bg-foreground/[0.025] p-4">
      <p className="text-xs font-medium text-foreground-subtle">{title}</p>
      {type === 'completion' && (
        <p className="mt-2 text-xl font-semibold text-foreground">
          {value.completed}{' '}
          <span className="text-sm font-medium text-foreground-subtle">of {value.total}</span>
        </p>
      )}

      {type === 'progress' && (
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground-secondary/20">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-foreground-secondary">{value}%</span>
        </div>
      )}

      {type === 'text' && (
        <p className="mt-2 text-sm font-semibold text-foreground-secondary">{value}</p>
      )}
    </div>
  );
};

export default ProjectMetric;
