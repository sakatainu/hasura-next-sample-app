import { Box, ClickAwayListener, Grow, Popper } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

export type PopBackProps = React.PropsWithChildren<{
  defaultOpen?: boolean;
  triggerEl?: HTMLElement | null;
}>;

const PopBack: React.FC<PopBackProps> = ({
  defaultOpen = false,
  triggerEl = null,
  children,
}) => {
  const [state, setState] = useState({
    open: defaultOpen,
    isHoveringTrigger: defaultOpen,
    isHoveringPopup: false,
  });

  const handleTriggerMouseLeave = useCallback(() => {
    setState((prev) => ({ ...prev, isHoveringTrigger: false }));
  }, []);

  const handlePopupMouseEnter = useCallback(() => {
    setState((prev) => ({ ...prev, isHoveringPopup: true }));
  }, []);

  const handlePopupMouseLeave = useCallback(() => {
    setState((prev) => ({ ...prev, isHoveringPopup: false }));
  }, []);

  useDebounce(
    () => {
      if (state.isHoveringPopup) return;
      if (state.isHoveringTrigger) return;
      setState({
        open: false,
        isHoveringTrigger: false,
        isHoveringPopup: false,
      });
    },
    100,
    [state.isHoveringPopup, state.isHoveringTrigger]
  );

  useEffect(() => {
    const triggerPopup = () => {
      setState({ open: true, isHoveringTrigger: true, isHoveringPopup: false });
    };

    triggerEl?.addEventListener('mouseenter', triggerPopup);
    triggerEl?.addEventListener('mouseleave', handleTriggerMouseLeave);

    return () => {
      triggerEl?.removeEventListener('mouseenter', triggerPopup);
      triggerEl?.removeEventListener('mouseleave', handleTriggerMouseLeave);
    };
  }, [handleTriggerMouseLeave, triggerEl]);

  const handleClickAway = () => {
    if (state.isHoveringTrigger || state.isHoveringPopup) return;

    setState({ open: false, isHoveringTrigger: false, isHoveringPopup: false });
  };

  return (
    <Popper
      open={Boolean(triggerEl) && state.open}
      anchorEl={triggerEl}
      placement="right-start"
      modifiers={[
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            altAxis: false,
          },
        },
      ]}
      transition
      sx={{ minWidth: 200, zIndex: ({ zIndex }) => zIndex.drawer + 1 }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Box
            onMouseEnter={handlePopupMouseEnter}
            onMouseLeave={handlePopupMouseLeave}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box>{children}</Box>
            </ClickAwayListener>
          </Box>
        </Grow>
      )}
    </Popper>
  );
};

export default PopBack;
