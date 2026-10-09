import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

import { formatDateOnly, parseDateOnly, toDateOnlyString } from '../../utils/date-formatter';
import { type Alignment, usePopup } from '../hooks/usePopup';

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
        className={`inline-flex items-center disabled:cursor-not-allowed disabled:opacity-50 ${triggerClassName ?? defaultTriggerClassName}`}
      >
        {value ? formatDateOnly(value) : placeholder}
      </button>
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
