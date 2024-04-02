import NiceModal, {
  NiceModalHandler,
  muiDialogV5,
  useModal,
} from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from '@mui/material';

export type ConfirmDialogProps = Omit<DialogProps, 'title'> & {
  title?: React.ReactNode;
  message: React.ReactNode;
  /** @deprecated use 'Actions' instead */
  actions?: React.ReactNode;
  Actions?: React.FC<{ modal: NiceModalHandler }>;
  disabledImplicitClose?: boolean;
};

const ConfirmDialogBase = ({
  title = null,
  message,
  actions,
  ...rest
}: ConfirmDialogProps): JSX.Element => (
  <Dialog {...rest}>
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent>
      <DialogContentText whiteSpace="pre-wrap">{message}</DialogContentText>
    </DialogContent>
    <DialogActions>{actions}</DialogActions>
  </Dialog>
);

export const ConfirmDialog2 = NiceModal.create<ConfirmDialogProps>(
  ({
    title = null,
    message,
    actions,
    Actions,
    disabledImplicitClose,
    ...rest
  }) => {
    const modal = useModal();
    const niceModalProps = muiDialogV5(modal);

    const onClose = () => {
      if (disabledImplicitClose) return;
      niceModalProps.onClose();
    };
    return (
      <ConfirmDialogBase
        {...niceModalProps}
        {...rest}
        title={title}
        message={message}
        actions={actions || Actions?.({ modal })}
        onClose={onClose}
      />
    );
  }
);

export default ConfirmDialogBase;
