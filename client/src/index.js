import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const theme = {
  primary: '#e4e6eb',
  secondary: '#44475a',
  background: '#1c1e21',
  box: '#242526',
  boxHover: '#3b3c3c',
  link: '#e4e6eb',
  separator: '#3d4349',
  primaryText: '#f2f2f2',
  secondaryText: '#8be9fd',
  disabled: '#6272a4',
  danger: '#ff5555',
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
