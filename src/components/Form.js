import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';

export default class UserForm extends Component {
  onChange = (e) => {this.props.changeText(e.target.value, e.target.name)};
  onSubmit = (e) => {
    e.preventDefault();
    let firstName = this.refs.name.value;
    let email = this.refs.email.value;
    let phone = this.refs.phone.value;
    if(!firstName || !email || !phone){
      alert('Please enter text in all the fields. name=' + firstName + ' email: ' + email + ' phone:' +phone );

      return;
    }
    if(!isEmail(email)){
      alert('Please use proper email');
    }else if (!isNumeric(phone)){
      alert('Please use proper phone');
    }else {
      if(this.props.isEdit){
        let updatedUser = {
          id: this.props.isEdit,
          firstName: firstName,
          email: email,
          phone: phone,
        }
        this.props.onUserUpdate(updatedUser);
      } else{
        let newPart = {
          id: Math.floor(Math.random() * 99999),
          firstName: firstName,
          email: email,
          phone: phone,
        }
        this.props.onUserAdd(newPart);
        this.refs.name.value = '';
        this.refs.email.value = '';
        this.refs.phone.value = '';
        }
    }

  }

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.props.nameText} name= "name" ref="name" onChange={this.onChange}/>
        <input type="text" value={this.props.emailText} name= "email" ref="email" onChange={this.onChange} />
        <input type="text" value={this.props.phoneText} name= "phone" ref="phone" onChange={this.onChange}/>
        <button> Click </button>
      </form>
    )
  }
}
