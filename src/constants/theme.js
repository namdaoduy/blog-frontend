import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#f3ecda',
      dark: '#c0baa8',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffffff',
      main: '#54471e',
      dark: '#2b2000',
      contrastText: '#f3ecda',
    },
    pagination: {
      light: '#cccccc',
      main: '#cccccc',
      dark: '#cccccc',
      contrastText: '#cccccc',
    },
  },
});

export default theme;