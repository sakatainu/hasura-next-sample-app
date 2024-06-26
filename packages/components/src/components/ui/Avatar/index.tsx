import React from 'react';
import { Business, Person, SvgIconComponent } from '@mui/icons-material';
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material';
import { getAvatarShortLabel, getAvatarColor, getFontColor } from '~/utils';

export type AvatarProps = MuiAvatarProps & {
  fallback?: 'business' | 'person';
  label?: string | undefined;
  labelLength?: number;
};

const FallbackTemplate = (Icon: SvgIconComponent) => (
  <Icon
    sx={{
      minWidth: '75%',
      minHeight: '75%',
    }}
  />
);

const fallBacks = {
  business: FallbackTemplate(Business),
  person: FallbackTemplate(Person),
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ fallback, label, labelLength = 2, sx, ...rest }, ref) => (
    <MuiAvatar
      sx={{
        ...(label && {
          backgroundColor: getAvatarColor(label),
          color: getFontColor(getAvatarColor(label)),
          fontWeight: 'bold',
        }),
        ...sx,
      }}
      {...rest}
      ref={ref}
    >
      {label
        ? getAvatarShortLabel(label, labelLength)
        : fallBacks[fallback || 'business']}
    </MuiAvatar>
  )
);
Avatar.displayName = 'Avatar';

export default Avatar;
