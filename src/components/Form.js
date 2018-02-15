import React, {Component} from 'react';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

export default class UserForm extends Component {
  onChange = (e) => {this.props.changeText(e.target.value, e.target.name)};
  // Function to add new user data
  onSubmit = (e) => {
    e.preventDefault();
    let fullName = this.refs.name.value;
    let email = this.refs.email.value;
    let phone = this.refs.phone.value;
    // Simple validation to prevent empty data
    if(!fullName || !email || !phone){
      alert('Please enter text in all the fields. name=' + fullName + ' email: ' + email + ' phone:' +phone );
      return;
    }
    // Simple validator for email and phone using validator.js
    if(!isEmail(email)){
      alert('Please use proper email');
    }else if (!isMobilePhone(phone, 'any')){
      alert('Please use proper phone');
    }else {
      let newPart = {
        id: this.props.participants.length +  1,
        fullName: fullName,
        email: email,
        phone: phone,
      }
      this.props.onUserAdd(newPart);
      this.refs.name.value = '';
      this.refs.email.value = '';
      this.refs.phone.value = '';
    }
  }

  render() {
    return(
      <div className="white-container">
        <form onSubmit={this.onSubmit}>
          <input className="name-input" placeholder="Full Name" type="text" name= "name" ref="name" onChange={this.onChange}/>
          <input className="email-input" placeholder="Email" type="text" name= "email" ref="email" onChange={this.onChange} />
          <input className="phone-input" placeholder="Phone" type="text" name= "phone" ref="phone" onChange={this.onChange}/>
          <button className="button"> Add New </button>
        </form>
      </div>
    )
  }
}
