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

  handleRemove(){
    this.setState({
      contactData: update(
        this.state.contactData,
        {
          $splice: [[this.state.selectedKey, 1]]
        }
      )
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
          let keyword;
          if(this.state.keyword){
            keyword= this.state.keyword.toLowerCase();
          }
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
                <input name="keyword" placeholder="Search"
                            value={this.state.keyword} onChange={this.handleChange}/>
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                    contact={this.state.contactData[this.state.selectedKey]}
                    isSelected={this.state.selectedKey!=-1}/>
                <ContactCreate onCreate={this.handleCreate}/>
            </div>
        );
  }
}