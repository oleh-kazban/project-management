import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import type { Task } from '../types/task';

type TaskStatus = Task['status'];
type MenuAlignment = 'start' | 'end';

type TaskStatusMenuProps = {
  alignment: MenuAlignment;
  status: TaskStatus;
  onStatusChange: (_status: TaskStatus) => void;
};

const statusPresentation: Record<
  TaskStatus,
  { label: string; className: string; indicatorClassName: string }
> = {
  completed: {
    label: 'Completed',
    className: 'bg-success-surface/10 text-success',
    indicatorClassName: 'bg-success',
  },
  'in-progress': {
    label: 'In progress',
    className: 'bg-warning-surface/10 text-warning',
    indicatorClassName: 'bg-warning',
  },
  todo: {
    label: 'To do',
    className: 'bg-foreground-muted/10 text-foreground-muted',
    indicatorClassName: 'bg-foreground-muted',
  },
};

const statusOptions: TaskStatus[] = ['todo', 'in-progress', 'completed'];
const menuGap = 8;
const viewportPadding = 8;

type MenuPosition = {
  top: number;
  left: number;
  maxHeight: number;
  placement: 'top' | 'bottom';
};

const TaskStatusMenu = ({ alignment, status, onStatusChange }: TaskStatusMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentPresentation = statusPresentation[status];

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePlacement = () => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;

      if (!trigger || !menu) {
        return;
      }

      const triggerRect = trigger.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const menuHeight = menu.scrollHeight;
      const availableAbove = Math.max(0, triggerRect.top - menuGap - viewportPadding);
      const availableBelow = Math.max(
        0,
        window.innerHeight - triggerRect.bottom - menuGap - viewportPadding,
      );
      const fitsAbove = menuHeight <= availableAbove;
      const fitsBelow = menuHeight <= availableBelow;
      const placement =
        fitsBelow || (!fitsAbove && availableBelow >= availableAbove) ? 'bottom' : 'top';
      const maxHeight = placement === 'bottom' ? availableBelow : availableAbove;
      const renderedHeight = Math.min(menuHeight, maxHeight);
      const preferredLeft =
        alignment === 'start' ? triggerRect.left : triggerRect.right - menuRect.width;
      const left = Math.min(
        Math.max(viewportPadding, preferredLeft),
        window.innerWidth - menuRect.width - viewportPadding,
      );
      const top =
        placement === 'bottom'
          ? triggerRect.bottom + menuGap
          : triggerRect.top - menuGap - renderedHeight;

      setMenuPosition({ top, left, maxHeight, placement });
    };

    updatePlacement();
    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);

    return () => {
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [alignment, isOpen, status]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target) &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    optionRefs.current[0]?.focus();

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOptionKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;

    if (event.key === 'ArrowDown') {
      nextIndex = (index + 1) % statusOptions.length;
    } else if (event.key === 'ArrowUp') {
      nextIndex = (index - 1 + statusOptions.length) % statusOptions.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = statusOptions.length - 1;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      optionRefs.current[nextIndex]?.focus();
    }
  };

  const selectStatus = (nextStatus: TaskStatus) => {
    onStatusChange(nextStatus);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen(open => !open)}
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${currentPresentation.className}`}
      >
        {currentPresentation.label}
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label="Change task status"
            className="fixed z-50 min-w-36 overflow-y-auto rounded-xl border border-default/10 bg-surface-raised p-1 shadow-xl shadow-canvas/20"
            style={{
              top: menuPosition?.top ?? 0,
              left: menuPosition?.left ?? 0,
              ...(menuPosition ? { maxHeight: menuPosition.maxHeight } : {}),
              visibility: menuPosition ? 'visible' : 'hidden',
            }}
            data-placement={menuPosition?.placement}
          >
            {statusOptions.map((option, index) => {
              const presentation = statusPresentation[option];

              return (
                <button
                  key={option}
                  ref={element => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={status === option}
                  onClick={() => selectStatus(option)}
                  onKeyDown={event => handleOptionKeyDown(event, index)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-foreground-secondary transition hover:bg-foreground/5 hover:text-foreground"
                >
                  {presentation.label}
                  {status === option && (
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${presentation.indicatorClassName}`}
                    />
                  )}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default TaskStatusMenu;
