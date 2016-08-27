import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';


export default class Contact extends React.Component {

  // 이 컴포넌트의 state는 constructor에서만 만들어놓을 수 있다.
  // constructor를 제외한 곳에서는 '수정'만 가능하다. 새로운 프로퍼티 제작 못한다고.
  constructor(props) {
    //super() => 이 객체가 상속받은 부모객체 (React.Component)의 실행자를 실행시키는 코드.
    // ?? 그래서 뭔 역할인데.
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

    // 함수의 컨텍스트 문제 때문에 이걸 써준다.
    // 이 객체(클래스)의 handleChange란 함수 (사실 변수지만)에 이 객체(클래스)를 바인딩한
    // 새로운 함수 (바인딩 한 것 빼곤 똑같지만)을 대입한다. 할당한다.
    // 함수 객체에 속성 하나 추가해준 거나 다름 없음.
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  // 리액트 생명 주기. React Life-cycle => 잘 알아놔야한다. 중요하다.
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

  //이벤트 객체에 관하여 잘 알아둘 것.
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
        // $splice => 제거. 제거할 값의 인덱스, 거기부터 지울 갯수.
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

          // name에서 keyword를 찾을 수 있는지 없는지.
          // indexOf => 없으면 -1을 리턴하고, 있으면 keyword의 위치를 반환. 갯수가 아니다.
          return name.indexOf(keyword) > -1;
        }
      );
      return data.map((contact, i) => {
        // map 할 때는 항상 요소마다 key 를 할당해 줘야 한다.
        // ContactInfo가 컴포넌트이므로 여기의 onClick은 프로퍼티다.
        return (<ContactInfo onClick={()=>{this.handleClick(i);}} contact={contact} key={i}/>);
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        {/* onChange, onRemove, onEdit... => 함수가 아니라 프로퍼티다. 프로퍼티로 넘기면
          컴포넌트 안에서 this.props.onChange()같이 사용가능.*/}
        <input name="keyword" placeholder="Search" value={this.state.keyword}
          onChange={this.handleChange}/>
        <div>
          {mapToComponents(this.state.contactData)}
        </div>
        {/*아래 컴포넌트들로 내려주는 값들을 변화시킬 수 있다. 아랫 녀석들은 바뀐 값들로 다시 그려진다.
          왜냐하면 state가 바뀌면 자동으로 뷰가 다시 그려지기 때문이다. 물론 '필요한 부분만' 다시 그려진다.*/}
        <ContactDetails contact={this.state.contactData[this.state.selectedKey]}
          isSelected={this.state.selectedKey!=-1} onRemove={this.handleRemove}
          onEdit={this.handleEdit} />
        <ContactCreate onCreate={this.handleCreate}/>
      </div>
    );
  }
}
