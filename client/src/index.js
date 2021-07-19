import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Provider } from 'react-redux'
import store from 'redux/store/store';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHEABLE_KEY)

const theme = createTheme({
  palette: {
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
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

