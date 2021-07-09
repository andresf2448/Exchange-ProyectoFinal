import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    // type: 'dark',
    primary: {
      light: '#3C415C',
      main: '#301B3F',
      dark: '#151515',
      contrastText: '#B4A5A5'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

