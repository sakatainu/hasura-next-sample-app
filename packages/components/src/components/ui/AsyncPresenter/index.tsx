import React, { ReactNode } from 'react';
import { Box, BoxProps, CircularProgress } from '@mui/material';
import { deepmerge } from '@mui/utils';

export type AsyncPresenterProps = BoxProps & {
  loading: boolean;
  children?: ReactNode;
};

const AsyncPresenter: React.FC<AsyncPresenterProps> = ({
  loading,
  children = null,
  sx,
  ...rest
}) => {
  if (!loading) return <>{children}</>;

  return (
    <Box
      sx={deepmerge(
        {
          width: 1,
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        sx
      )}
      {...rest}
    >
      <CircularProgress />
    </Box>
  );
};

export default AsyncPresenter;
