import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export type Alignment = 'start' | 'end';
type Placement = 'top' | 'bottom';
type UsePopupOptions = {
  alignment: Alignment;
};
type PopupPosition = {
  top: number;
  left: number;
  maxHeight: number;
  placement: Placement;
};

const popupGap = 8;
const viewportPadding = 8;

export const usePopup = ({ alignment }: UsePopupOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(open => !open);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePlacement = () => {
      const trigger = triggerRef.current;
      const popup = popupRef.current;

      if (!trigger || !popup) {
        return;
      }

      const triggerRect = trigger.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      const popupHeight = popup.scrollHeight;
      const availableAbove = Math.max(0, triggerRect.top - popupGap - viewportPadding);
      const availableBelow = Math.max(
        0,
        window.innerHeight - triggerRect.bottom - popupGap - viewportPadding,
      );
      const fitsAbove = popupHeight <= availableAbove;
      const fitsBelow = popupHeight <= availableBelow;
      const placement =
        fitsBelow || (!fitsAbove && availableBelow >= availableAbove) ? 'bottom' : 'top';
      const maxHeight = placement === 'bottom' ? availableBelow : availableAbove;
      const renderedHeight = Math.min(popupHeight, maxHeight);
      const preferredLeft =
        alignment === 'start' ? triggerRect.left : triggerRect.right - popupRect.width;
      const left = Math.min(
        Math.max(viewportPadding, preferredLeft),
        window.innerWidth - popupRect.width - viewportPadding,
      );
      const top =
        placement === 'bottom'
          ? triggerRect.bottom + popupGap
          : triggerRect.top - popupGap - renderedHeight;

      setPopupPosition({ top, left, maxHeight, placement });
    };

    updatePlacement();
    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);

    return () => {
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [alignment, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target) &&
        !popupRef.current?.contains(event.target)
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

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return { isOpen, close, toggle, popupPosition: popupPosition, containerRef, triggerRef, popupRef: popupRef };
};
