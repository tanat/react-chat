import {combineReducers} from 'redux';
import {List, Map} from 'immutable';
import constants from '../constants';
import Message from '../models/Message';


const messages = (state = new List(),  action) => {
  let {type, payload} = action;

  switch (type) {

    case constants.MESSAGE_ADD:
      return state.push(new Message(payload.id, payload.name, payload.type, payload.text));

    case constants.USER_CONNECTED:
      return state.push(new Message(payload.id, payload.name, payload.type, `User #${payload.name} connected`));

    case constants.USER_DISCONNECTED:
      return state.push(new Message(payload.id, payload.name, payload.type, `User #${payload.name} disconnected`));

    case constants.USER_CHANGE_NAME:
      return state.push(
        new Message(payload.id, payload.name, payload.type, `User #${payload.oldName} change name to #${payload.newName}`)
      );

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
};

const userInfo = (state = false, action) => {
  switch (action.type) {
    case constants.GET_INFO:
      return Map(action.payload);
    case constants.INFO_UPDATED:
      return state.set('name', action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  messages,
  connectionStatus,
  userInfo,
});
