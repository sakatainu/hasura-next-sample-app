import { Button, ButtonProps } from '@mui/material';
import { KeyboardDoubleArrowLeft as ArrowIcon } from '@mui/icons-material';
import React, { forwardRef } from 'react';

type ToggleButtonType = {
  isToggle: boolean;
} & ButtonProps;

const ToggleButton = forwardRef<never, ToggleButtonType>(
  ({ children, sx, isToggle, ...rest }, ref) => (
    <Button
      ref={ref}
      sx={{
        ...sx,
        minWidth: '20px',
        width: '20px',
        height: '40px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        ...(isToggle
          ? {
              borderRight: 'none',
              borderRadius: '4px 0 0 4px',
            }
          : {
              borderLeft: 'none',
              borderRadius: '0 4px 4px 0',
            }),
        cursor: 'pointer',
        boxShadow: ({ shadows }) => shadows[1],
      }}
      {...rest}
    >
      <ArrowIcon
        sx={{
          fontSize: '1rem',
          transform: isToggle ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
      />
    </Button>
  )
);
ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
