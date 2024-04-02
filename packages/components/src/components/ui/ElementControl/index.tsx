import React from 'react';

export type ElementControlProps = {
  hide?: boolean;
  children: React.ReactNode;
};

const ElementControl: React.FC<ElementControlProps> = ({
  hide = false,
  children,
}) => <>{!hide && children}</>;

export default ElementControl;
