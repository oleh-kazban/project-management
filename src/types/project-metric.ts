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
