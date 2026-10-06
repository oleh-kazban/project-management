import { ProjectMetricData } from './ProjectMetrics';

type ProjectMetricProps = {
  metric: ProjectMetricData;
};

const ProjectMetric = ({ metric }: ProjectMetricProps) => {
  const { title, type, value } = metric;

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      {type === 'completion' && (
        <p className="mt-2 text-xl font-semibold text-white">
          {value.completed}{' '}
          <span className="text-sm font-medium text-slate-500">of {value.total}</span>
        </p>
      )}

      {type === 'progress' && (
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700/70">
            <div
              className="h-full rounded-full bg-cyan-300 transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-slate-200">{value}%</span>
        </div>
      )}

      {type === 'text' && <p className="mt-2 text-sm font-semibold text-slate-200">{value}</p>}
    </div>
  );
};

export default ProjectMetric;
