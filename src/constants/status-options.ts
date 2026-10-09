import { Status } from '../types/status';
import type { FloatingMenuOption } from '../ui/Menu/FloatingMenu';

export const statusOptions = [
  {
    value: 'todo',
    label: 'To do',
    className: 'bg-foreground-muted/10 text-foreground-muted',
    indicatorClassName: 'bg-foreground-muted',
  },
  {
    value: 'in-progress',
    label: 'In progress',
    className: 'bg-warning-surface/10 text-warning',
    indicatorClassName: 'bg-warning',
  },
  {
    value: 'completed',
    label: 'Completed',
    className: 'bg-success-surface/10 text-success',
    indicatorClassName: 'bg-success',
  },
] satisfies FloatingMenuOption<Status>[];
