import { useEffect, useId } from 'react';
import { DayPicker } from 'react-day-picker';
import { createPortal } from 'react-dom';

import { formatDateOnly, parseDateOnly, toDateOnlyString } from '../../utils/date-formatter';
import { type Alignment, usePopup } from '../hooks/usePopup';

import 'react-day-picker/style.css';

// value, minDate and maxDate are date-only strings (YYYY-MM-DD), the same format as the models
type DatePickerProps = {
  value?: string;
  minDate?: string;
  maxDate?: string;
  placeholder?: string;
  triggerClassName?: string;
  className?: string;
  onChange: (_value: string | undefined) => void;
  ariaLabel: string;
  alignment?: Alignment;
  disabled?: boolean;
};

const defaultTriggerClassName =
  'rounded-lg border border-default/10 px-3 py-2 text-sm text-foreground-secondary transition hover:bg-foreground/5 hover:text-foreground';

const DatePicker = ({
  value,
  minDate,
  maxDate,
  placeholder = 'Select date',
  triggerClassName,
  className = '',
  ariaLabel,
  alignment = 'start',
  disabled = false,
  onChange,
}: DatePickerProps) => {
  const popupId = useId();
  const { isOpen, close, toggle, popupPosition, containerRef, triggerRef, popupRef } = usePopup({
    alignment,
  });
  const isPositioned = popupPosition !== null;
  const selected = value ? parseDateOnly(value) : undefined;
  const startDate = minDate ? parseDateOnly(minDate) : undefined;
  const endDate = maxDate ? parseDateOnly(maxDate) : undefined;

  useEffect(() => {
    if (isOpen && isPositioned) {
      popupRef.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
    }
  }, [isOpen, isPositioned, popupRef]);

  const handleSelect = (date: Date | undefined) => {
    onChange(date ? toDateOnlyString(date) : undefined);
    close();
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`.trim()}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={popupId}
        aria-label={value ? `${ariaLabel}: ${formatDateOnly(value)}` : ariaLabel}
        onClick={toggle}
        disabled={disabled}
        className={`inline-flex w-full items-center justify-between disabled:cursor-not-allowed disabled:opacity-50 ${triggerClassName ?? defaultTriggerClassName}`}
      >
        <span className="truncate">{value ? formatDateOnly(value) : placeholder}</span>
      </button>
      {value && (
        <button
          type="button"
          aria-label="Clear date"
          onClick={() => handleSelect(undefined)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-foreground-muted transition hover:bg-foreground/5 hover:text-foreground-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            id={popupId}
            role="dialog"
            aria-label={ariaLabel}
            className="fixed z-50 overflow-y-auto rounded-xl border border-default/10 bg-surface-raised p-3 shadow-xl shadow-canvas/20"
            style={{
              top: popupPosition?.top ?? 0,
              left: popupPosition?.left ?? 0,
              ...(popupPosition ? { maxHeight: popupPosition.maxHeight } : {}),
              visibility: popupPosition ? 'visible' : 'hidden',
            }}
            data-placement={popupPosition?.placement}
          >
            <DayPicker
              className="app-calendar"
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              defaultMonth={selected}
              startMonth={startDate}
              endMonth={endDate}
              disabled={[
                ...(startDate ? [{ before: startDate }] : []),
                ...(endDate ? [{ after: endDate }] : []),
              ]}
            />
          </div>,
          document.body,
        )}
    </div>
  );
};

export default DatePicker;
