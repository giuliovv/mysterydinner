// HomePage.js
import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import artDecoImage from '../assets/images/art_deco.png';

function HomePage() {
    // Encoded SVG background image for a subtle grain effect
    const svgBackground = encodeURIComponent(`
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.9"
            numOctaves="1"
            stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" fill="white" fill-opacity="0" />
      </svg>
    `);
  
    return (
      <Box sx={{
        bgcolor: '#211b16',
        color: 'primary.contrastText',
        textAlign: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        '&::after': { 
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `url("data:image/svg+xml,${svgBackground}")`,
          backgroundSize: 'cover',
          pointerEvents: 'none',
          opacity: 0.0
        },
      }}>
        <Typography variant="h2" gutterBottom sx={{ my: 4 }}>
            Murder Mystery Dinner Generator
          </Typography>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <img
            src={artDecoImage}
            alt="Art Deco Detective"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              mb: 4
            }}
            // Add your navigation link or function to start the game
          >
            Start
          </Button>
        </Box>
      </Box>
    );
  }
  
  export default HomePage;
