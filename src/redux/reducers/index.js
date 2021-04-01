import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import login from './login'
import campaign from './campaign'
import department from './department'
import fcm from './fcm'
import inventory from './inventory'
import invoice from './invoice'
import izin from './izin'
import myreminder from './myreminder'
import presence from './presence'
import reminder from './reminder'
import report from './report'
import ticket from './ticket'
import user from './user'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  debug: false,
  // whitelist: ['login, book']
}

const reducer = combineReducers({
  login,
  campaign,
  department,
  fcm,
  inventory,
  izin,
  invoice,
  myreminder,
  presence,
  reminder,
  report,
  ticket,
  user,
})

export default persistReducer(persistConfig, reducer)
