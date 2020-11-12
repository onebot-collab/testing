import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store'

import Admin from './layouts/Admin'
import Login from './pages/Auth/Login'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d32f2f',
      main: '#c62828',
      dark: '#b71c1c',
    },
    secondary: {
      light: '#4caf50',
      main: '#43a047',
      dark: '#388e3c',
    },
    type: 'dark',
  },
})

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <PersistGate persistor={persistor}>
              <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Redirect from="/" to="/login" />
                <Route path="*">
                  <h1 className="text-center mt-5">
                    <b>404 Page not found</b>
                  </h1>
                </Route>
              </Switch>
            </PersistGate>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </div>
  )
}

export default App
