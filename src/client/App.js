import React from 'react'
import { renderRoutes } from 'react-router-config'
import Navbar from './components/includes/Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import './app.css'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto'
    ].join(','),
  },
});

const App = ({ route }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <Navbar />
            {renderRoutes(route.routes)}
        </MuiThemeProvider>
    )
}

export default App