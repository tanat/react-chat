import {createAction} from '../utils';
import constants from '../constants';

export const MessageAddAction = createAction(constants.MESSAGE_ADD);
export const UserConnectedAction = createAction(constants.USER_CONNECTED);
export const UserDisconnectedAction = createAction(constants.USER_DISCONNECTED);
export const GetInfoAction = createAction(constants.GET_INFO);
export const InfoUpdatedAction = createAction(constants.INFO_UPDATED);
export const SetConnectionStatusAction = createAction(constants.SET_CONNECTION);
export const UserChangeNameAction = createAction(constants.USER_CHANGE_NAME);
