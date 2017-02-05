import React from 'react';
import {connect} from 'react-redux';

@connect((state) => ({
  userInfo: state.userInfo
}))
export default class UserInfo extends React.Component {

  state = {
    editMode: false,
    newName: '',
  };

  render() {
    const {editMode, newName} = this.state;
    let content;

    if (editMode) {
      content = (<div className="info--form">
        #<input ref={(input) => this.input = input} value={newName} onChange={this.onChange} className="info--input" />
        <i className="fa fa-check info--save" onClick={this.save} />
        <i className="fa fa-times info--cancel" onClick={this.cancel} />
      </div>)
    } else {
      content = (<div className="info--name">#{this.props.userInfo.get('name')}
        <span className="info--edit" onClick={this.toggleEdit}>edit</span>
      </div>);
    }

    return (<div className="info">{content}</div>);
  }

  toggleEdit = () => {
    const {editMode} = this.state;
    let newName = editMode ? '' : this.props.userInfo.get('name');

    if (editMode) {
      this.input = null;
    } else {
      setTimeout(() => this.input.focus(), 0);
    }

    this.setState({editMode: !editMode, newName: newName});
  };

  cancel = () => {
    this.toggleEdit();
  };

  save = (e) => {
    e.preventDefault();
    const {onNameChanged, userInfo} = this.props;
    let newName = this.state.newName.trim();
    let oldName = userInfo.get('name');

    if (newName.length > 0 && newName !== oldName) {
      onNameChanged(newName);
    }

    this.toggleEdit();

  };

  onChange = (e) => {
    this.setState({
      newName: e.target.value,
    });
  };
}
