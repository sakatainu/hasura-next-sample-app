import { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from '@mui/material';
import { useCallback } from 'react';

export type DialogTemplateProps = Omit<DialogProps, 'open' | 'title'> & {
  id: string;
  title?: React.ReactNode;
  actions?: React.ReactNode[];
  disabledImplicitClose?: boolean;
};

const DialogTemplate = ({
  title = null,
  children,
  actions,
  disabledImplicitClose,
  ...rest
}: DialogTemplateProps) => {
  const modal = useModal();
  const niceModalProps = muiDialogV5(modal);

  const onClose = useCallback(() => {
    if (disabledImplicitClose) return;
    niceModalProps.onClose();
  }, [disabledImplicitClose, niceModalProps]);

  const renderContent = () => {
    if (typeof children === 'string') {
      return (
        <DialogContentText whiteSpace="pre-wrap">{children}</DialogContentText>
      );
    }

    return <DialogContent>{children}</DialogContent>;
  };

  return (
    <Dialog {...niceModalProps} {...rest} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{renderContent()}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default DialogTemplate;
