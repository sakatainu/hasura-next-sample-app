import { Toolbar } from '@mui/material';
import React from 'react';
import useScrollState from '~/hooks/useScrollState';

const AppHeaderPlaceHolder: React.FC = () => {
  const { isDownScroll } = useScrollState({ threshold: 0 });

  return (
    <Toolbar
      sx={{
        display: isDownScroll ? 'none' : 'display',
        transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    />
  );
};

export default AppHeaderPlaceHolder;
