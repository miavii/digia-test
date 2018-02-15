import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const theme = createMuiTheme();

const Mapp = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Mapp />, document.getElementById('root'));
registerServiceWorker();
