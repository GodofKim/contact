import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';


export default class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedKey : -1,
      keyword: '',
      contactData: [{
        name: 'Abet',
        phone: '010-0000-0001'
      }, {
        name: 'Betty',
        phone: '010-0000-0002'
      }, {
        name: 'Charlie',
        phone: '010-0000-0003'
      }, {
        name: 'David',
        phone: '010-0000-0004'
      }]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillMount() {
    let contactData = localStorage.contactData;
    if(contactData){
      this.setState({
        contactData: JSON.parse(contactData)
      });
    }
  }

  componentDidUpdate(prevProps, prevState){
    // state에서 contactData가 변경되었을 때만 저장하도록 만든다.
    if(JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)){
      localStorage.contactData = JSON.stringify(this.state.contactData);
    }
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key
    });

    console.log(key);
  }

  handleCreate(contact) {
    this.setState({
      contactData: update(
        this.state.contactData,
        {
          $push: [contact]
        }
      )
    });
  }

  handleRemove() {
    this.setState({
      contactData: update(
        this.state.contactData,
        { $splice: [[this.state.selectedKey, 1]] }
      ),
      selectedKey: -1 // 현재 선택중인걸 무효화
    });
  }

  handleEdit(name, phone){
    this.setState({
      contactData: update(
        this.state.contactData,
        {
          [this.state.selectedKey]: {
            name: { $set: name },
            phone: { $set: phone }
          }
        }
      )
    });
  }

  render() {
    const mapToComponents = (data) => {
      data.sort();
      data = data.filter(
        (contact) => {
          let name = contact.name.toLowerCase();
          let keyword = this.state.keyword.toLowerCase();

          return name.indexOf(keyword) > -1;
        }
      );
      return data.map((contact, i) => {
        return (<ContactInfo onClick={()=>{this.handleClick(i);}} contact={contact} key={i}/>);
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input name="keyword" placeholder="Search" value={this.state.keyword}
          onChange={this.handleChange}/>
        <div>
          {mapToComponents(this.state.contactData)}
        </div>
        <ContactDetails contact={this.state.contactData[this.state.selectedKey]}
          isSelected={this.state.selectedKey!=-1} onRemove={this.handleRemove}
          onEdit={this.handleEdit.bind(this)} />
        <ContactCreate onCreate={this.handleCreate}/>
      </div>
    );
  }
}
