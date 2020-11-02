import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store'

import Admin from './layouts/Admin'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <PersistGate persistor={persistor}>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Redirect from="/" to="/admin/dashboard" />
              <Route path="*">
                <h1 className="text-center mt-5">
                  <b>404 Page not found</b>
                </h1>
              </Route>
            </Switch>
          </PersistGate>
        </Router>
      </Provider>
    </div>
  )
}

export default App
