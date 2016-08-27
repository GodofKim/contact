import React from 'react';


export default class ContactInfo extends React.Component {
  render() {
    return (
      // 아 이건 Component 가 아니라 div니까 함수인 onClick이 맞네.
      <div onClick={this.props.onClick}>{this.props.contact.name}</div>
    );
  }
}
