import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD600',
    },
    secondary: {
      main: '#FFD600',
    },
    error: {
      main: '#D32F2F',
    },
    background: {
      default: '#211b16',
    },
    text: {
      primary: '#ffffff', // Set the primary text color to white
      secondary: '#b2b2b2', // A lighter shade for secondary text
      disabled: '#7f7f7f', // Grey for disabled text
      cardTitle: 'black'
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Roboto Slab", "serif"',
      fontSize: '2.2rem',
      fontWeight: 500,
      letterSpacing: '-0.01562em',
      color: '#ffffff', // Ensure headers also use the specified text color
    },
    h2: {
      fontFamily: '"Roboto Slab", "serif"',
      fontSize: '1.5rem',
      fontWeight: 400,
      color: '#ffffff',
    },
    h3: {
      fontFamily: '"Roboto Slab", "serif"',
      fontSize: '1.17rem',
      fontWeight: 400,
      color: '#ffffff',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#ffffff', // Apply to body text as well
    },
    button: {
      textTransform: 'none',
      // If you want to set a specific color for button text, do it here
    },
    // Define other text styles as needed
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff', // This sets the default text color for Typography components to white
        },
      },
    },
    // Override other component styles as needed to ensure text color consistency
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        //   color: '#ffffff', // Set default button text color
        },
      },
    },
    // Add overrides for other text-displaying components here
  },
  // Additional customizations can be added here
});

export default theme;
