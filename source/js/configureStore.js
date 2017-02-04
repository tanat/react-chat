import React from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

const middlewareList = [thunkMiddleware];

const finalCreateStore = applyMiddleware(...middlewareList)(createStore);

function configureStore(initialState = {}) {
  /* eslint-disable no-underscore-dangle */
  return finalCreateStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  /* eslint-enable */
}

export const store = configureStore();
