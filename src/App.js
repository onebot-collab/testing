import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Admin from './layouts/Admin'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/admin/dashboard" />
          <Route path="*">
            <h1 className="text-center mt-5">
              <b>404 Page not found</b>
            </h1>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
