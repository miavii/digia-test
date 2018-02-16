import React, { Component } from 'react';
import './App.css';
import Faker from 'faker';
import Header from './components/Header.js';
import UserForm from './components/Form.js';
import Row from './components/UserRow.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameText: '',
      emailText: '',
      phoneText: '',
      isEdit: 0, // which row to edit
      sort: {
        column: null,
        direction: 'desc',
      },
      participants: [],
      };
    this.onSort = this.onSort.bind(this);
  }
  componentWillMount() {
    // Populate User Data using Faker.js
    if(this.state.participants.length === 0 ){
      this.createUser();
    }
  }

  createUser = () => {
    let participants = this.state.participants;
    let total =0;
    while (total < 20){
      let id = total + 1 ;
      let fullName = Faker.name.findName();
      let email = Faker.internet.email();
      let phone = Faker.phone.phoneNumberFormat(0);
      const newUser = {
         id: id,
         fullName: fullName,
         email: email,
         phone: phone,}
      console.log(total, newUser);
      participants.push(newUser);
      this.setState({participants: participants});
      total++;
    }
  }

  handleUserAdd = (participant) => {
    // Adds new user to end of state array
    this.setState({participants: this.state.participants.concat(participant)});
  }

  handleUserDelete = (participant) => {
    let participants = this.state.participants;
    // Remove user to delete from array
    for(let i = 0; i < participants.length; i++){
      if(participants[i].id === participant.id){
        participants.splice(i, 1);
      }
    }
    // Set updated array to state
    this.setState({participants: participants});
  }

  handleUserEdit = (participant) => {
    // Add the data of user to edit to state
    this.setState({
      nameText: participant.fullName,
      emailText: participant.email,
      phoneText: participant.phone,
      isEdit: participant.id
    });
  }

  handleChangeText = (text, ref) => {
    // Check changed text updates the right field
    if(ref === "name"){
      this.setState({nameText:text});
    } else if (ref === "email"){
      this.setState({emailText:text});
    } else if (ref === "phone"){
      this.setState({phoneText:text});
    }
  }

  handleUserUpdate = (participant) => {
    let participants = this.state.participants;

    // Remove old user data
    for(let i = 0; i < participants.length; i++){
      if(participants[i].id === participant.id){
        participants.splice(i, 1);
      }
    }
    // Add updated user data to the array
    participants.push(participant);
    // Set state with updated array and clear edit row
    this.setState({
      participants: participants,
      isEdit: 0,
    });
  }

  handleCancel = () => {
    // Clear edit row
    this.setState({isEdit:0,});
  }

  onSort(column) {
    return (function (e) {
      let direction = this.state.sort.direction;
      if (this.state.sort.column === column) {
        // Change the sort direction if the same column is sorted.
        direction = this.state.sort.direction === 'asc' ? 'desc' : 'asc';
      }
      // Sort ascending.
      const sortedData = this.state.participants.sort((a, b) => {
        if (column === 'name') {
          // This sorts strings taking into consideration numbers in strings.
          // e.g., Name 1, Name 2, Name 10. Normal sorting would sort it Name 1, Name 10, Name 2.
          const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

          return collator.compare(a.fullName, b.fullName);
        } else if (column==='email'){
          const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
          return collator.compare(a.email, b.email);
        } else {
          const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

          return collator.compare(a.phone, b.phone);
        }
      });
      // Reverse the order if direction is descending.
     if (direction === 'desc') {
       sortedData.reverse();
     }

     // Set the new state.
     this.setState({
       participants: sortedData,
       sort: {
         column,
         direction,
       }
     });
    }).bind(this); // Bind "this" again because the onSort function is returning another function.
  }
  setArrow = (column) => {
      let value = '';

      if (this.state.sort.column === column) {
        value = this.state.sort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
      }
      return value;
    };

  render() {
    return (
      <div className="container">
        <Header/>
        <div className="content">
          <h2>List of participants</h2>
          <UserForm
            {...this.state}
            changeText={this.handleChangeText}
            onUserAdd={this.handleUserAdd}
            onUserUpdate={this.handleUserUpdate}/>
          <div className="table-container">
          <table className="white-container">
            <tbody>
            <tr className="header-rows">
                <td className="name" onClick={this.onSort('name')}>Name <i className="material-icons">{this.setArrow('name')}</i></td>
                <td className="email" onClick={this.onSort('email')}>Email <i className="material-icons">{this.setArrow('email')}</i></td>
                <td className="phone" onClick={this.onSort('phone')}>Phone <i className="material-icons">{this.setArrow('phone')}</i></td>
                <td className="buttonColumn"></td>
            </tr>
            <Row
            {...this.state}
            editUser={this.handleUserEdit}
            deleteUser={this.handleUserDelete}
            changeText={this.handleChangeText}
            onUserUpdate={this.handleUserUpdate}
            cancelEdit={this.handleCancel}
            />
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  }
}
