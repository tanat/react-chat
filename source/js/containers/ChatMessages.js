import React from 'react';
import {connect} from 'react-redux';


@connect((state) => ({
  messages: state.messages,
}))
export default class ChatMessages extends React.Component {

  render() {
    return (<div className="messages">
      <div className="messages--list">{this.messages}</div>
    </div>);
  }

  get messages() {
    let list = [];

    this.props.messages.forEach((message, i) => {
      if (message.type === 'enter') {
        list.push(<div className="message message_enter" key={i}>
          <i className="fa fa-sign-in" />{message.text}
          </div>);
      } else if (message.type === 'leave') {
        list.push(<div className="message message_leave" key={i}>
          <i className="fa fa-sign-out" />{message.text}</div>);
      } else if (message.type === 'text') {
        list.push(<div className="message message_text" key={i}>
          <div className="message--user">
            <i className="fa fa-user-o" />#{message.userId}:
          </div>
          <div className="message--text">{message.text}</div>
        </div>);
      }
    });

    return list;
  }

}