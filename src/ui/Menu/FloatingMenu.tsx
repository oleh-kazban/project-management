import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { type Alignment, usePopup } from '../Popup/usePopup';

export type FloatingMenuOption<T> = {
  value: T;
  label: string;
  className?: string;
  indicatorClassName?: string;
};
type FloatingMenuProps<T extends string> = {
  options: FloatingMenuOption<T>[];
  value: T;
  onChange: (_value: T) => void;
  alignment?: Alignment;
  ariaLabel: string;
};

const FloatingMenu = <T extends string>({
  options,
  value,
  ariaLabel,
  onChange,
  alignment = 'end',
}: FloatingMenuProps<T>) => {
  const menuId = useId();
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { isOpen, close, toggle, popupPosition, containerRef, triggerRef, popupRef } = usePopup({
    alignment,
  });

  const currentSelectedOption = options.find(option => option.value === value);

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

  const isPositioned = popupPosition !== null;

  useEffect(() => {
    if (isOpen && isPositioned) {
      optionRefs.current[0]?.focus();
    }
  }, [isOpen, isPositioned]);

  const selectOption = (nextValue: T) => {
    onChange(nextValue);
    close();
    triggerRef.current?.focus();
  };

  if (!currentSelectedOption) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={toggle}
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${currentSelectedOption.className ?? ''}`}
      >
        {currentSelectedOption.label}
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            id={menuId}
            role="menu"
            aria-label={ariaLabel}
            className="fixed z-50 min-w-36 overflow-y-auto rounded-xl border border-default/10 bg-surface-raised p-1 shadow-xl shadow-canvas/20"
            style={{
              top: popupPosition?.top ?? 0,
              left: popupPosition?.left ?? 0,
              ...(popupPosition ? { maxHeight: popupPosition.maxHeight } : {}),
              visibility: popupPosition ? 'visible' : 'hidden',
            }}
            data-placement={popupPosition?.placement}
          >
            {options.map((option, index) => {
              return (
                <button
                  key={option.value}
                  ref={element => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={option.value === value}
                  onClick={() => selectOption(option.value)}
                  onKeyDown={event => handleOptionKeyDown(event, index)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-foreground-secondary transition hover:bg-foreground/5 hover:text-foreground"
                >
                  {option.label}
                  {option.value === value && (
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${option.indicatorClassName ?? ''}`}
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

export default FloatingMenu;
