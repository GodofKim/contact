import React from 'react';

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input type="text" name="name" placeholder="name"
                        value={this.state.name} onChange={this.handleChange}/>
                    <input type="text" name="phone" placeholder="phone"
                        value={this.state.phone} onChange={this.handleChange}/>
                </p>
                <button>Create</button>
            </div>
        );
    }
}
