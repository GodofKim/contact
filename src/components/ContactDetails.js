import React, {Component} from 'react';

export default class ContactDetails extends Component{
  constructor(props){
    super(props);

    this.state = {
      isEdit: false,
      name:'',
      phone: ''
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if(e.charCode==13) {
        this.handleToggle();
    }
  }

  handleToggle() {
    if(!this.state.isEdit) {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone
      });
    } else {
      this.props.onEdit(this.state.name, this.state.phone);
    }
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleRemove(){
    this.props.onRemove();
  }

  render() {
    const edit = (
      <div>
        <p>
          <input type="text" name="name" placeholder="name"
            value={this.state.name} onChange={this.handleChange} onKeyPress={this.handleKeyPress.bind(this)}/>
        </p>
        <p>
          <input type="text" name="phone" placeholder="phone"
            value={this.state.phone} onChange={this.handleChange} onKeyPress={this.handleKeyPress.bind(this)}/>
        </p>
      </div>
    );

    const read = (
      <div>
        <p>{ this.props.contact.name }</p>
        <p>{ this.props.contact.phone }</p>
      </div>
    );

    // 선택되었을 때 보여질 부분
    const details = (
      <div>
        { this.state.isEdit ? edit : read }
        <button onClick={this.handleToggle}>{this.state.isEdit ? 'Ok' : 'Edit'}</button>
        <button onClick={this.handleRemove.bind(this)}>Remove</button>
      </div>
    );

    // 아무것도 선택되지 않았을 때 보여질 부분
    const blank = (
      <div> Nothing is Selected </div>
    );

    return(
      <div>{this.props.isSelected? details : blank }</div>
    );
  }
}

ContactDetails.defaultProps = {
  contact : {
    name: '',
    phone: ''
  }
};
