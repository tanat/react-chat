import React from 'react';
import {connect} from 'react-redux';

@connect((state) => ({
  userInfo: state.userInfo
}))
export default class UserInfo extends React.Component {
  render() {
    return <div className="info">
      <div className="info--name">#{this.props.userInfo.get('name')}</div>
    </div>;
  }
}
