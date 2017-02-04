import {combineReducers} from 'redux';
import {List} from 'immutable';
import constants from '../constants';
import Message from '../models/Message';


const messages = (state = new List(),  action) => {
  let {type, payload} = action;

  switch (type) {

    case constants.MESSAGE_ADD:
      return state.push(new Message(payload.id, payload.type, payload.text));

    case constants.USER_CONNECTED:
      return state.push(new Message(payload.id, payload.type, `User #${payload.id} connected`));

    case constants.USER_DISCONNECTED:
      return state.push(new Message(payload.id, payload.type, `User #${payload.id} disconnected`));

    default:
      return state;
  }
};

const connectionStatus = (state = false, action) => {
  switch (action.type) {
    case constants.SET_CONNECTION:
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  messages,
  connectionStatus,
});
