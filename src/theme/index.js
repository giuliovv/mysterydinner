// src/theme/index.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Deep blue for elegance and authority
    },
    secondary: {
      main: '#FFD600', // Gold or mustard for a touch of opulence
    },
    error: {
      main: '#D32F2F',
    },
    background: {
      default: '#211b16',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Roboto Slab", "serif"', // Adding Roboto Slab for headers
      fontSize: '2.2rem',
      fontWeight: 500,
      letterSpacing: '-0.01562em',
    },
    // Applying Roboto Slab to other headers for consistency
    h2: {
      fontFamily: '"Roboto Slab", "serif"',
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Roboto Slab", "serif"',
      fontSize: '1.17rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // Avoids capitalizing all letters in buttons
    },
    // Define other text styles as needed
  },
  // Custom component modifications can go here
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Example of adding some custom styling to all buttons
          fontSize: '1rem',
        },
      },
    },
    // You can also override styles for other components here
  },
  // Additional customizations like breakpoints, shadows, etc., can be added here
});

export default theme;
