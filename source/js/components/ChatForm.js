import React from 'react';
import {connect} from 'react-redux';

export default class ChatForm extends React.Component {

  state = {
    text: '',
  };

  render() {
    return (<form className="form">
      <input type="text" onChange={this.onChange} value={this.state.text} />
      <button type="submit" onClick={this.onClick} className="form--button">Send</button>
    </form>);
  }

  onChange = (e) => {
    this.setState({
      text: e.target.value
    });
  };

  onClick = (e) => {
    e.preventDefault();

    let text = this.state.text.trim();
    if (text.length > 0) {
      this.props.onSend(text);
      this.setState({
        text: ''
      })
    }
  };

}
