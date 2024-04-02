import { Fade, Paper, Popper, PopperProps } from '@mui/material';
import { DateRangePicker } from 'mui-daterange-picker';
import { ShowFn, useModal } from 'mui-modal-provider';
import React, { useCallback, useMemo, useState } from 'react';

export type DateRangeProps = Partial<
  React.ComponentProps<typeof DateRangePicker>
>;
export type ModalInstance = ReturnType<ShowFn>;
export type DialogToggleFn = (params: {
  anchorEl: HTMLElement;
  popperProps?: Partial<PopperProps>;
  dateRangeProps: DateRangeProps;
}) => void;

export type DateRangePickerDialogHook = () => {
  toggle: DialogToggleFn;
};

const useDateRangePickerDialog: DateRangePickerDialogHook = () => {
  const { showModal } = useModal();

  const [dialogInstance, setDialogInstance] = useState<ModalInstance | null>(
    null
  );

  const destroy = useCallback((dialog: ModalInstance) => {
    dialog.destroy();
    setDialogInstance(null);
  }, []);

  const toggle = useCallback<DialogToggleFn>(
    ({ anchorEl, dateRangeProps, popperProps }) => {
      if (dialogInstance) {
        destroy(dialogInstance);
        return;
      }

      const dialog = showModal(Popper, {
        anchorEl: anchorEl || document.body,
        transition: true,
        sx: { zIndex: ({ zIndex }) => zIndex.modal },
        children: ({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper elevation={1}>
              <DateRangePicker
                {...dateRangeProps}
                open
                toggle={() => destroy(dialog)}
                updateByTrigger
                onChange={dateRangeProps.onChange || (() => null)}
              />
            </Paper>
          </Fade>
        ),
        ...popperProps,
      });

      setDialogInstance(dialog);
    },
    [destroy, dialogInstance, showModal]
  );

  return useMemo(() => ({ toggle }), [toggle]);
};

export default useDateRangePickerDialog;
