// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import movieReducer from '../store/reducer/movieReducer';

const rootReducer = combineReducers({
  movie: movieReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
