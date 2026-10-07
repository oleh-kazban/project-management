import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export type Alignment = 'start' | 'end';
type Placement = 'top' | 'bottom';
type UseMenuOptions = {
  alignment: Alignment;
};
type MenuPosition = {
  top: number;
  left: number;
  maxHeight: number;
  placement: Placement;
};

const menuGap = 8;
const viewportPadding = 8;

export const useMenu = ({ alignment }: UseMenuOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(open => !open);

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
  }, [alignment, isOpen]);

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

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return { isOpen, close, toggle, menuPosition, containerRef, triggerRef, menuRef };
};
