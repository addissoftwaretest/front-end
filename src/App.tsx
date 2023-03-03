import React from 'react';
import {ThemeProvider, createTheme} from '@mui/material';

// Pages
import HomePage from 'page/home';
const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
