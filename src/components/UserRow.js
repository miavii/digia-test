import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';

export default class Row extends Component {
  onCancel = (e) =>{
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
      let updatedUser = {
        id: this.props.isEdit,
        firstName: firstName,
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
    const displayStyle = {
      height: 70 ,
      color: "#606060",
      fontSize:"16px",
      lineHeight: "24px",
      fontWeight: "300",
      paddingRight: 0,
    }
    const editStyle = {
      color: "#606060",
      fontSize:"16px",
      lineHeight: "24px",
      fontWeight: "300",
      paddingLeft: "16px",
      paddingRight:16,
      paddingTop: 14,
      paddingBottom:10,
    }
    const buttonPosition = {
      textAlign: "right",
    }
    const iconStyle = {
      color: "#eeeeee",
    }
    const partToEdit = this.props.isEdit;
    return(
      <React.Fragment>
      {
        this.props.participants.map(participant => {
          if(this.props.isEdit === participant.id){
            return <tr style={{borderBottomColor: "#f1f1f1"}} key={participant.id}>
                <td className="name" style={editStyle}>
                  <input className="name-input" type="text" value={this.props.nameText} name= "name" ref="name" onChange={this.onChange}/>
                </td>
                <td className="email" style={editStyle}>
                  <input className="email-input" type="text" value={this.props.emailText} name= "email" ref="email" onChange={this.onChange}/>
                </td>
                <td className="phone phone-input" style={editStyle}>
                  <input type="text" value={this.props.phoneText} name= "phone" ref="phone" onChange={this.onChange}/>
                </td>
                <td className="buttonColumn buttonCol-input" style={editStyle}>
                  <button className="button-cancel" onClick={this.onCancel}>Cancel</button><button type="submit" className="button-save">Save</button>

                </td>
              </tr>
          } else {
            return <tr style={{borderBottomColor: "#f1f1f1", paddingLeft:"16px"}} key={participant.id}>
                    <td className="name" style={displayStyle}>
                      <span onClick={this.onEdit.bind(this, participant)}>{participant.firstName} </span>
                    </td>
                    <td className="email" style={displayStyle}>
                      <span onClick={this.onEdit.bind(this, participant)}>{participant.email}</span>
                    </td>
                    <td className="phone"style={displayStyle}>
                      <span onClick={this.onEdit.bind(this, participant)}>{participant.phone}</span>
                    </td>
                    <td className="buttonColumn" style={displayStyle, buttonPosition}>
                      <IconButton onClick={this.onEdit.bind(this, participant)}>
                        <ModeEditIcon style={{color:"#eeeeee"}}/>
                      </IconButton>
                      <IconButton onClick={this.onDelete.bind(this, participant)}>
                        <DeleteIcon/>
                      </IconButton>
                    </td>
                  </tr>
          }
        })
      }
      </React.Fragment>
    )
  }
}
