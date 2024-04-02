import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material' {
  interface Palette {
    whiteBoard: Palette['primary'];
  }

  interface PaletteOptions {
    whiteBoard: PaletteOptions['primary'];
  }

  interface AppBarPropsColorOverrides {
    whiteBoard: true;
  }
}

const baseTheme = createTheme({
  palette: {
    primary: {
      light: '#49d5e2ff',
      main: '#0098a6',
      dark: '#005961ff',
      contrastText: '#fff',
    },
    error: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828',
      contrastText: '#fff',
    },
    whiteBoard: {
      main: '#fff',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          minWidth: 400,
        },
      },
    },
  },
});
const theme = responsiveFontSizes(baseTheme);

export default theme;
