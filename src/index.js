import React from 'react';
import ReactDOM from 'react-dom';
import './css/master.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, deepPurple, yellow } from '@material-ui/core/colors';
import App from './components/App';

import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme(
  {
    type: 'dark',
    palette: {
      primary: {
        main: red.A700,
        transparent: 'rgba(213, 0, 0, 0.6)',
      },
      primary2: {
        main: 'black',
        transparent: 'rgba(0, 0, 0, 0.6)',
      },
      primary3: {
        main: 'white',
        transparent: 'rgba(255, 255, 255, 0.6)',
      },
      accent: {
        main: deepPurple.A700,
      },
      secondary: {
        main: yellow.A700,
        transparent: 'rgba(255, 214, 0, 0.6)',
      },
      transparent: 'rgba(0, 0, 0, 0)',
      canvas: 'rgba(0, 0, 0, 0.6)',
      canvas2: 'rgba(255, 255, 255, 0.6)',
      canvas3: 'rgba(0, 0, 0, .2)',
      canvas4: 'rgba(255, 255, 255, .2)',
      canvas5: 'rgba(0, 0, 0, .9)',
      canvas6: 'rgba(255, 255, 255, 1)',
      canvas7: 'rgba(128, 128, 128, 0.6)',
      text: {
        primary: '#ffffff',
        alternate: '#000000',
        secondary: yellow.A700,
        disabled: '#00c853',
        main: '#d50000',
        accent: deepPurple.A700,
      },
      pickerHeaderColor: 'rgba(255, 255, 255, 0.6)',
      shadowColor: 'rgba(255, 214, 0, 0.6)',
    },
    typography: {
      fontFamily: "'Xolonium', 'Franklin', 'Roboto', 'Arial', sans-serif",
      display4: {
        fontFamily: "'Avengeance', 'Franklin', 'Roboto', 'Arial', sans-serif",
      },
      display3: {
        fontFamily: "'Avengeance', 'Franklin', 'Roboto', 'Arial', sans-serif",
      },
      display2: {
        fontFamily: "'Avengeance', 'Franklin', 'Roboto', 'Arial', sans-serif",
      },
      display1: {
        fontFamily: "'Avengeance', 'Franklin', 'Roboto', 'Arial', sans-serif",
      },
    },
    appBar: {
      color: 'rgba(213, 0, 0, 0.6)',
      textColor: '#ffffff',
    },
    tabs: {
      backgroundColor: 'rgba(213, 0, 0, 0.6)',
      textColor: '#ffffff',
      selectedTextColor: '#ffd600',
    },
    textField: {
      floatingLabelColor: 'rgba(0, 0, 0, 0.6)',
      hintColor: '#6200ea',
    },
    image: {
      width: '100%',
    },
  },
);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
