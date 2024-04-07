import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Ensure your theme is correctly set up
import HomePage from './pages/HomePage';
import StepPage from './pages/StepPage'; // Import the StepPage component
import FinalPage from './pages/FinalPage';

function App() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/steps" element={<StepPage />} />
          <Route path="/final" element={<FinalPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
