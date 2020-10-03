import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const Colors = {
  primary: '#e4e6eb',
  secondary: '#44475a',
  background: '#1c1e21',
  box: '#242526',
  boxHover: '#3b3c3c',
  link: '#e4e6eb',
  separator: '#3d4349',
  primaryText: '#f2f2f2',
  secondaryText: '#8be9fd',
  disabled: '#6272a4',
  danger: '#ff5555',
  PrimaryText: 'rgba(0, 0, 0, 0.87)',
  SecondaryText: '#44515d',
};

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    background: {
      default: Colors.background,
    },
    box: {
      main: Colors.box,
    },
    text: {
      primary: Colors.PrimaryText,
      secondary: Colors.SecondaryText,
      disabled: Colors.disabled,
    },
  },
});
