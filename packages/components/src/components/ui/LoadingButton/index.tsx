import { LoadingButton as MuiLoadingButton } from '@mui/lab';
import { ButtonProps } from '@mui/material';
import React from 'react';
import { useBoolean } from 'react-use';

// NOTE: MuiLoadingButtonProps を使用すると eslint がスタックするため、ButtonProps で代用
export type LoadingButtonProps = Omit<ButtonProps, 'onClick'> & {
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => Promise<void> | void;
  loading?: boolean;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  loading: initialLoading,
  ...props
}) => {
  const [loading, setLoading] = useBoolean(Boolean(initialLoading));

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setLoading(true);

    (async () => {
      try {
        const maybePromise = onClick?.(e);

        if (maybePromise instanceof Promise) {
          await maybePromise;
        }
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <MuiLoadingButton {...props} loading={loading} onClick={handleClick} />
  );
};

export default LoadingButton;
