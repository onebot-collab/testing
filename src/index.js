/* eslint-disable import/no-unresolved */
import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/material-dashboard-react.css?v=1.9.0'
import 'bootstrap/dist/css/bootstrap.min.css'
// import {Provider} from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker'
// import store from './store'

ReactDOM.render(
  //  <Provider store={store}>
  <App />,
  // </Provider>
  document.getElementById('root'),
)

serviceWorker.unregister()
