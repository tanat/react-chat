import React from 'react';

export default class ChatForm extends React.Component {

  static propTypes = {
    onSend: React.PropTypes.func.isRequired
  };

  state = {
    text: '',
  };

  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    return (<form className="form">
      <input ref={(input) => this.textInput = input} type="text" onChange={this.onChange} value={this.state.text} className="form--text" />
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
