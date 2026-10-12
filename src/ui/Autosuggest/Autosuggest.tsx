import {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { usePopup } from '../hooks/usePopup';

export type AutosuggestProps<T> = {
  value: string;
  onChange: (_value: string) => void;
  items: T[];
  isLoading?: boolean;
  onSelect: (_item: T) => void;
  getOptionLabel: (_item: T) => string;
  getOptionKey: (_item: T) => string | number;
  renderOption?: (_item: T, _isHighlighted: boolean) => ReactNode;
  placeholder?: string;
  minChars?: number;
  emptyText?: string;
  minCharsHint?: string;
  className?: string;
  inputClassName?: string;
  ariaLabel?: string;
};

const Autosuggest = <T,>({
  value,
  onChange,
  items,
  isLoading = false,
  onSelect,
  getOptionLabel,
  getOptionKey,
  renderOption,
  placeholder = 'Search...',
  minChars = 3,
  emptyText = 'No results found',
  minCharsHint,
  className = '',
  inputClassName = '',
  ariaLabel,
}: AutosuggestProps<T>) => {
  const listboxId = useId();
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { isOpen, open, close, popupPosition, containerRef, triggerRef, popupRef } =
    usePopup<HTMLInputElement>('start');

  const isQueryTooShort = value.trim().length < minChars;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setHighlightedIndex(-1);
    if (!isOpen) {
      open();
    }
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    close();
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        open();
        event.preventDefault();
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (items.length > 0) {
        setHighlightedIndex(prev => (prev + 1) % items.length);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (items.length > 0) {
        setHighlightedIndex(prev => (prev <= 0 ? items.length - 1 : prev - 1));
      }
    } else if (event.key === 'Enter') {
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        event.preventDefault();
        handleSelect(items[highlightedIndex]);
      }
    } else if (event.key === 'Escape') {
      close();
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="m20 20-4-4" />
        </svg>

        <input
          ref={triggerRef}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={
            highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined
          }
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={open}
          onClick={open}
          placeholder={placeholder}
          aria-label={ariaLabel ?? placeholder}
          className={`w-full rounded-xl border border-default/10 bg-foreground/[0.03] py-2 pl-9 pr-8 text-sm text-foreground-secondary outline-none placeholder:text-foreground-faint transition focus:border-accent/40 [&::-webkit-search-cancel-button]:hidden ${inputClassName}`}
        />

        {value.length > 0 && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              onChange('');
              setHighlightedIndex(-1);
              triggerRef.current?.focus();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-foreground-faint transition hover:text-foreground"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel ?? 'Search suggestions'}
            className="fixed z-50 overflow-y-auto rounded-xl border border-default/10 bg-surface-raised p-1 shadow-xl shadow-canvas/20"
            style={{
              top: popupPosition?.top ?? 0,
              left: popupPosition?.left ?? 0,
              width: popupPosition?.width ?? 'auto',
              ...(popupPosition ? { maxHeight: popupPosition.maxHeight } : {}),
              visibility: popupPosition ? 'visible' : 'hidden',
            }}
            data-placement={popupPosition?.placement}
          >
            {isQueryTooShort ? (
              <div className="px-3 py-2.5 text-xs text-foreground-faint">
                {minCharsHint ?? `Please type at least ${minChars} characters to search...`}
              </div>
            ) : isLoading ? (
              <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-foreground-muted">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-foreground-faint border-t-accent" />
                <span>Searching...</span>
              </div>
            ) : items.length === 0 ? (
              <div className="px-3 py-2.5 text-xs text-foreground-faint">{emptyText}</div>
            ) : (
              items.map((item, index) => {
                const isHighlighted = highlightedIndex === index;
                const key = getOptionKey(item);
                const label = getOptionLabel(item);

                return (
                  <div
                    key={key}
                    id={`${listboxId}-option-${index}`}
                    ref={element => {
                      optionRefs.current[index] = element;
                    }}
                    role="option"
                    aria-selected={isHighlighted}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => handleSelect(item)}
                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition ${
                      isHighlighted
                        ? 'bg-foreground/10 text-foreground'
                        : 'text-foreground-secondary hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    {renderOption ? renderOption(item, isHighlighted) : <span>{label}</span>}
                  </div>
                );
              })
            )}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Autosuggest;
