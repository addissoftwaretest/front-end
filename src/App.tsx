import React from 'react';
import {ThemeProvider, createTheme} from '@mui/material';

// Pages
import HomePage from 'page/home';

//component
import ErrorBoundary from 'components/ErrorBoundary/errorBoundary';

const theme = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
