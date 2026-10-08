import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { type Alignment, usePopup } from '../hooks/usePopup';

export type DotsFloatingMenuOption = {
  label: string;
  onSelect: () => void;
  className?: string;
};
type DotsFloatingMenuProps = {
  options: DotsFloatingMenuOption[];
  alignment?: Alignment;
  ariaLabel: string;
};

const defaultOptionClassName =
  'text-foreground-secondary hover:bg-foreground/5 hover:text-foreground';

const DotsFloatingMenu = ({ options, ariaLabel, alignment = 'end' }: DotsFloatingMenuProps) => {
  const menuId = useId();
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { isOpen, close, toggle, popupPosition, containerRef, triggerRef, popupRef } = usePopup({
    alignment,
  });
  const isPositioned = popupPosition !== null;

  useEffect(() => {
    if (isOpen && isPositioned) {
      optionRefs.current[0]?.focus();
    }
  }, [isOpen, isPositioned]);

  const handleOptionKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;

    if (event.key === 'ArrowDown') {
      nextIndex = (index + 1) % options.length;
    } else if (event.key === 'ArrowUp') {
      nextIndex = (index - 1 + options.length) % options.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = options.length - 1;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      optionRefs.current[nextIndex]?.focus();
    }
  };

  const selectOption = (option: DotsFloatingMenuOption) => {
    close();
    triggerRef.current?.focus();
    option.onSelect();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={ariaLabel}
        onClick={toggle}
        className="rounded-xl border border-default/10 p-2.5 text-foreground-muted transition hover:bg-foreground/5 hover:text-foreground"
      >
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="19" cy="12" r="1.5" />
        </svg>
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            id={menuId}
            role="menu"
            aria-label={ariaLabel}
            className="fixed z-50 min-w-40 overflow-y-auto rounded-xl border border-default/10 bg-surface-raised p-1 shadow-xl shadow-canvas/20"
            style={{
              top: popupPosition?.top ?? 0,
              left: popupPosition?.left ?? 0,
              ...(popupPosition ? { maxHeight: popupPosition.maxHeight } : {}),
              visibility: popupPosition ? 'visible' : 'hidden',
            }}
            data-placement={popupPosition?.placement}
          >
            {options.map((option, index) => (
              <button
                key={option.label}
                ref={element => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="menuitem"
                onClick={() => selectOption(option)}
                onKeyDown={event => handleOptionKeyDown(event, index)}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition ${option.className ?? defaultOptionClassName}`}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default DotsFloatingMenu;
