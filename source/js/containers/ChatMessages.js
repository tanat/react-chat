import React from 'react';
import {connect} from 'react-redux';


@connect((state) => ({
  messages: state.messages,
}))
export default class ChatMessages extends React.Component {

  componentDidUpdate() {
    if (this.div) {
      this.div.scrollTop = this.div.scrollHeight;
    }
  }

  render() {
    return (<div className="messages">
      <div ref={(div) => this.div = div} className="messages--list">{this.messages}</div>
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
            <i className="fa fa-user-o" />#{message.name}:
          </div>
          <div className="message--text">{message.text}</div>
        </div>);
      } else if (message.type === 'name changed') {
        list.push(<div className="message message_changed" key={i}>
          <i className="fa fa-pencil" />{message.text}</div>);
      }
    });

    return list;
  }

}