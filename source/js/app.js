import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import '../styles/app.scss';

import {store} from './configureStore';
import Chat from './components/Chat';

const root = document.getElementById('root');
ReactDOM.render(
  (<Provider store={store}>
    <Chat />
  </Provider>),
  root
);