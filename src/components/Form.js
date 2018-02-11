import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class UserForm extends Component {
  onChange = (e) => {this.props.changeText(e.target.value, e.target.name)};
  onSubmit = (e) => {
    e.preventDefault();
    let firstName = this.refs.name.value;
    let email = this.refs.email.value;
    let phone = this.refs.phone.value;

    if(!firstName){
      alert('Please enter a name.');
      return;
    }
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

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <TextField type="text" value={this.props.nameText} name= "name" ref="name" onChange={this.onChange}/>
        <TextField type="text" value={this.props.emailText} name= "email" ref="email" onChange={this.onChange} />
        <TextField type="text" value={this.props.phoneText} name= "phone" ref="phone" onChange={this.onChange}/>
        <FlatButton> Click </FlatButton>
      </form>
    )
  }
}
