import { Theme } from '@mui/material';
import { GlobalStylesProps } from '@mui/system';
import theme from '~/configs/theme';

const globalStyles: GlobalStylesProps<Theme>['styles'] = {
  body: {
    backgroundColor: theme.palette.grey[50],
    minWidth: 1024,
  },
  '#__next': {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default globalStyles;
