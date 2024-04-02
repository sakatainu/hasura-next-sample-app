import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import HideOnScroll from '~/components/ui/HideOnScroll';
import Logo from '~/components/ui/Logo';
import Row from '~/components/ui/Row';

export type AppFrameProps = {
  children?: React.ReactNode;
};

const AppFrame = ({ children }: AppFrameProps) => (
  <HideOnScroll>
    <AppBar
      color="whiteBoard"
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Row alignItems="center">
          <Logo
            sx={{
              width: 112,
              height: 36,
            }}
          />
        </Row>
        {children}
      </Toolbar>
    </AppBar>
  </HideOnScroll>
);

export default AppFrame;
