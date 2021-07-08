import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider, createTheme } from '@material-ui/core/styles';
// import {green, orange } from '@material-ui/core/colors';



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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
