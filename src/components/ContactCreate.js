import React from 'react';

export default class ContactCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        phone: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if(e.charCode==13){
      this.handleClick();
    }
  }

  handleClick() {
    const contact = {
      name: this.state.name,
      phone: this.state.phone
    };

    this.props.onCreate(contact);

    this.setState({
      name: '',
      phone: ''
    });

    //프로퍼티 ref와 관련된 코드. 지금 이 코드는 포커스를 강제로 옮긴다.
    this.nameInput.focus();
  }

  handleChange(e) {
    let nextState = {};
    // e.target.name => 말 그대로 한 엘리먼트의 'name'프로퍼티를 의미한다.
    // 아래 줄로 인해 nextState = { name: e.target.value }가 됨.
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <div>
        <h2>Create Contact</h2>
        <p>
          <input type="text" name="name" placeholder="name"
              value={this.state.name} onChange={this.handleChange}
              ref={(ref)=> { this.nameInput = ref; }}/>
          <input type="text" name="phone" placeholder="phone"
              value={this.state.phone} onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}/>
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}
