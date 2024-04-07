// HomePage.js
import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import artDecoImage from '../assets/images/art_deco.png';

function HomePage() {
    const theme = useTheme();
  
    return (
      <Box sx={{ 
        bgcolor: theme.palette.background.main, 
        color: theme.palette.background.contrastText, 
        textAlign: 'center', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', // This ensures the button and title are centered
        justifyContent: 'center', // This vertically centers the button and title
      }}>
        <Box
          component="img"
          src={artDecoImage}
          alt="Art Deco Detective"
          sx={{ 
            width: '100%', 
            maxWidth: '100vw', // Ensures the image is not wider than the viewport width
            height: 'auto', 
          }}
        />
        <Typography variant="h2" gutterBottom sx={{ my: 4 }}>
          Murder Mystery Dinner Generator
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ 
            mb: 4 // Adjust the spacing below the button as needed
          }}
          // Add your navigation link or function to start the game
        >
          Start
        </Button>
      </Box>
    );
  }
  
  export default HomePage;
