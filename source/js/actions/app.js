import {createAction} from '../utils';
import constants from '../constants';

export const MessageAddAction = createAction(constants.MESSAGE_ADD);
export const UserConnectedAction = createAction(constants.USER_CONNECTED);
export const UserDisconnectedAction = createAction(constants.USER_DISCONNECTED);
export const SetConnectionStatusAction = createAction(constants.SET_CONNECTION);
