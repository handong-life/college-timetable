import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(32,60,125)',
      light: 'rgb(120,137,176)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(35,64,127)',
      contrastText: '#fff',
    },
    good: {
      main: 'rgb(0, 134, 252)',
      light: 'rgb(112, 157, 255)',
    },
    bad: {
      main: 'rgb(255, 51, 80)',
      light: 'rgb(255, 120, 129)',
    },
    safe: 'rgb( 124, 208, 159)',
    moderate: 'rgb( 255, 207, 93)',
    danger: 'rgb(247, 137, 117)',
    backgroundColor: {
      default: 'rgb(253,253,253)',
      paper: 'rgb(255,255,255)',
      grayPaper: 'rgb(250,250,250)',
      bluePaper: 'rgb(251,253,254)',
      chip: 'rgb(247,247,247)',
      rateBar: 'rgb(243,243,243)',
    },
    divider: 'rgb(235,235,235)',
    text: {
      primary: 'rgb(74,74,74)',
      secondary: 'rgb(95,99,105)',
      hint: 'rgb(155,155,155)',
      disabled: 'rgb(155,155,155)',
      footer: 'rgb(137,143,156)',
      subTitle: 'rgb(116,116,116)',
      date: 'rgb(189,189,189)',
    },
  },
  typography: {
    fontFamily: ['NotoSansKR', 'Apple SD Gothic Neo', 'arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.143rem',
      fontWeight: '700',
    },
    h2: {
      fontSize: '1.714rem',
      fontWeight: '700',
    },
    h3: {
      fontSize: '1.286rem',
      fontWeight: '700',
    },
    h6: {
      fontSize: '1.143rem',
      fontWeight: '400',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 'normal',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: '600',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: '400',
    },

    overline: {
      fontSize: '0.6875rem',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
  },
  breakpoints: {
    values: {
      xs: 408, // 360  + 48
      sm: 696, // 648  + 48
      md: 1008, // 960  +  48
    },
  },
});

export default theme;
