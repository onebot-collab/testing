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
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
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
