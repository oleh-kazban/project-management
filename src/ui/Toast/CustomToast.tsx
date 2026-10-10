import { type Toast, toast } from 'react-hot-toast';

type ToastProps = {
  t: Toast;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
};

const CustomToast = ({ t, title, description, type = 'info' }: ToastProps) => {
  const containerStyles = {
    success: 'bg-success-surface text-canvas',
    error: 'bg-danger-surface text-danger-foreground',
    info: 'bg-accent-strong text-accent-foreground',
    warning: 'bg-warning-surface text-canvas',
  };

  const iconStyles = {
    success: 'text-canvas',
    error: 'text-danger-foreground',
    info: 'text-accent-foreground',
    warning: 'text-canvas',
  };

  const Icon = () => {
    switch (type) {
      case 'success':
        return (
          <svg
            className={`h-6 w-6 shrink-0 ${iconStyles.success} rounded-full p-0.5`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg
            className={`h-6 w-6 shrink-0 ${iconStyles.error} rounded-full p-0.5`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className={`h-6 w-6 shrink-0 ${iconStyles.warning} rounded-full p-0.5`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className={`h-6 w-6 shrink-0 ${iconStyles.info} rounded-full p-0.5`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`${
        t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      } ${containerStyles[type]} pointer-events-auto flex w-full max-w-xs transform rounded-xl border border-default/10 p-4 shadow-lg transition-all duration-300`}
    >
      <div className="flex w-full items-start gap-4">
        {Icon()}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-inherit">{title}</h3>
          {description && (
            <p className="mt-1 text-sm leading-5 text-inherit opacity-90">{description}</p>
          )}
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="shrink-0 rounded-lg p-1 text-inherit opacity-70 transition hover:bg-black/10 hover:opacity-100"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
