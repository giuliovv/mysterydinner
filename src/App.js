import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Ensure your theme is correctly set up
import HomePage from './pages/HomePage';
import StepPage from './pages/StepPage'; // Import the StepPage component
import FinalPage from './pages/FinalPage';
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyA2PlznCoAVy9B60lanKS0rG2O30qPO8nQ",
  authDomain: "mysterydinner-bd50a.firebaseapp.com",
  projectId: "mysterydinner-bd50a",
  storageBucket: "mysterydinner-bd50a.appspot.com",
  messagingSenderId: "1089576562776",
  appId: "1:1089576562776:web:7c9c206ce8d91113cc1a2d"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

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
