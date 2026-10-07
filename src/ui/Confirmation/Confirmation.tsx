import { type MouseEvent, type SyntheticEvent, useEffect, useId, useRef } from 'react';

type ConfirmationProps = {
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmClassName?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const defaultConfirmClassName = 'bg-accent text-accent-foreground hover:bg-accent-soft';

const Confirmation = ({
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  confirmClassName,
  onCancel,
  onConfirm,
}: ConfirmationProps) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (event.currentTarget.returnValue === 'confirm') {
      onConfirm();
    } else {
      onCancel();
    }
  };

  // A click on the backdrop targets the dialog element itself, not its content
  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      dialog.current?.close('cancel');
    }
  };

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={handleClose}
      onClick={handleDialogClick}
      className="m-auto w-full max-w-md rounded-2xl border border-default/10 bg-surface-raised p-0 text-foreground shadow-xl shadow-canvas/20 backdrop:bg-canvas/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <h2 id={titleId} className="text-lg font-semibold text-foreground">
          {title}
        </h2>
        {description && (
          <p id={descriptionId} className="mt-2 text-sm text-foreground-muted">
            {description}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={() => dialog.current?.close('cancel')}
            className="rounded-lg border border-default/10 px-4 py-2 text-sm font-semibold text-foreground-secondary transition hover:bg-foreground/5 hover:text-foreground"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => dialog.current?.close('confirm')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${confirmClassName ?? defaultConfirmClassName}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Confirmation;
