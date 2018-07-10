import { createStore, combineReducers, applyMiddleware } from 'redux';
import mapReducer from './maps/maps.reducer';
import thunk from 'redux-thunk';

const allReducers = combineReducers({
  map: mapReducer
})

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store;