import React, {Component} from 'react';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

export default class Row extends Component {
  onCancel = (e) =>{
    // clear input fields upon cancel edit
    this.refs.name.value = '';
    this.refs.email.value = '';
    this.refs.phone.value = '';
    e.preventDefault();
    this.props.cancelEdit();
  }
  onChange = (e) => {this.props.changeText(e.target.value, e.target.name)};
  onDelete = (participant) => {
    this.props.deleteUser(participant);
  }
  onEdit = (participant) => {
    this.props.editUser(participant);
  }
  // function for updating an existing user
  onSubmit = (e) => {
    e.preventDefault();
    // Takes all data
    let fullName = this.refs.name.value;
    let email = this.refs.email.value;
    let phone = this.refs.phone.value;
    // Simple validation to prevent empty data
    if(!fullName || !email || !phone){
      alert('Please enter text in all the fields. name: ' + fullName + ' email: ' + email + ' phone: ' +phone );
      return;
    }
    // Simple validator for email and phone using validator.js
    if(!isEmail(email)){
      alert('Please use proper email');
    }else if (!isMobilePhone(phone, 'any')){
      alert('Please use proper phone');
    }else {
      let updatedUser = {
        id: this.props.isEdit,
        fullName: fullName,
        email: email,
        phone: phone,
      }
      this.props.onUserUpdate(updatedUser);
      this.refs.name.value = '';
      this.refs.email.value = '';
      this.refs.phone.value = '';
    }
  }

  render() {
    return(
      <React.Fragment>
      {
        this.props.participants.map(participant => {
          if(this.props.isEdit === participant.id){
            return <tr className="edit" key={participant.id}>
                <td className="name">
                  <input className="name-input" type="text" value={this.props.nameText} name= "name" ref="name" onChange={this.onChange}/>
                </td>
                <td className="email">
                  <input className="email-input" type="text" value={this.props.emailText} name= "email" ref="email" onChange={this.onChange}/>
                </td>
                <td className="phone phone-input">
                  <input type="text" value={this.props.phoneText} name= "phone" ref="phone" onChange={this.onChange}/>
                </td>
                <td className="buttonColumn buttonCol-input">
                  <button className="button-cancel" onClick={this.onCancel}>Cancel</button>
                  <button type="submit" className="button-save" onClick={this.onSubmit.bind(this)}>Save</button>

                </td>
              </tr>
          } else {
            return <tr className="display" key={participant.id}>
                    <td className="name">
                      <span onClick={this.onEdit.bind(this, participant)}>{participant.fullName} </span>
                    </td>
                    <td className="email">
                      <span onClick={this.onEdit.bind(this, participant)}>{participant.email}</span>
                    </td>
                    <td className="phone">
                      <span onClick={this.onEdit.bind(this, participant)}>{participant.phone}</span>
                    </td>
                    <td className="buttonColumn">
                      <i className="material-icons" onClick={this.onEdit.bind(this, participant)}>mode_edit</i>
                      <i className="material-icons" onClick={this.onDelete.bind(this, participant)}>delete</i>
                    </td>
                  </tr>
          }
        })
      }
      </React.Fragment>
    )
  }
}
