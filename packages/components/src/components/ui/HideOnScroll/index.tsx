import React, { cloneElement, ReactElement } from 'react';
import { Slide } from '@mui/material';
import useScrollState from '~/hooks/useScrollState';

export type HideOnScrollProps = {
  children: ReactElement;
};

const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const { isDownScroll, isTrapOverTop } = useScrollState();

  return (
    <Slide appear={false} direction="down" in={!isDownScroll}>
      {cloneElement(children, {
        elevation: isTrapOverTop ? 4 : 0,
      })}
    </Slide>
  );
};

export default HideOnScroll;
