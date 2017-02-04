import React from 'react';
import {connect} from 'react-redux';

import ChatMessages from '../containers/ChatMessages';
import ChatForm from './ChatForm';
import {UserDisconnectedAction, UserConnectedAction, MessageAddAction, SetConnectionStatusAction} from '../actions/app';
import socketService from '../services/socket';


@connect((state) => ({
  connectionStatus: state.connectionStatus,
}))
export default class Chat extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props;
    socketService.connect()
      .then((socket) => {
        dispatch(SetConnectionStatusAction());
        socket.on('message', (data) => {
          if (data.type === 'enter') {
            dispatch(UserConnectedAction(data));
          } else if (data.type === 'leave') {
            dispatch(UserDisconnectedAction(data));
          } else if (data.type === 'text') {
            dispatch(MessageAddAction(data));
          }
        });

        this.socket = socket;

    });
  }

  render() {
    const {connectionStatus} = this.props;

    let content = connectionStatus ? this.chat : this.loader;

    return (<div className="chat">
      {content}
    </div>);
  }

  get loader() {
    return (<div className="chat--loader">
      <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
    </div>);
  }

  get chat() {
    return (<div className="chat--wrapper">
      <ChatMessages />
      <ChatForm onSend={this.onSend} />
    </div>);
  }

  onSend = (text) => {
    socketService.sendMessage(this.socket, text)
  }
}
