import React, { Component } from 'react';
import './App.css';
import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableRowColumn,
  TableSortLabel,
} from 'material-ui/Table';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
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
      isEdit: 0,
      sort: {
        column: null,
        direction: 'desc',
      },
      show:true,
      participants: [
        {
          "id": "00123",
          "firstName": "Erwin",
          "lastName": "Schimmel",
          "email": "Natalia.Will@gmail.com",
          "phone": "924 841-7188"
        },
        {
          "id": "19969",
          "firstName": "Percival",
          "lastName": "Ziemann",
          "email": "Sabryna.Hagenes36@hotmail.com",
          "phone": "476 266-1003"
        },
        {
          "id": "96149",
          "firstName": "Adriana",
          "lastName": "Aufderhar",
          "email": "Lavinia.Lueilwitz7@hotmail.com",
          "phone": "366 173-8993"
        },
        {
          "id": "24052",
          "firstName": "Vincenza",
          "lastName": "Schultz",
          "email": "Boyd1@hotmail.com",
          "phone": "710 717-0902"
        },
        {
          "id": "33958",
          "firstName": "Roosevelt",
          "lastName": "Mante",
          "email": "Trevor_Heller@hotmail.com",
          "phone": "544 861-5854"
        },
        {
          "id": "01526",
          "firstName": "Marietta",
          "lastName": "Lesch",
          "email": "Jamar.Mante@gmail.com",
          "phone": "235 981-6341"
        },
        {
          "id": "65947",
          "firstName": "Kale",
          "lastName": "Champlin",
          "email": "Frankie_Considine43@gmail.com",
          "phone": "991 614-1617"
        },
        {
          "id": "05664",
          "firstName": "Alvina",
          "lastName": "Jaskolski",
          "email": "Ryley41@hotmail.com",
          "phone": "491 451-3900"
        },
        {
          "id": "44160",
          "firstName": "Hayden",
          "lastName": "Batz",
          "email": "Viva35@yahoo.com",
          "phone": "199 644-3358"
        },
        {
          "id": "84830",
          "firstName": "Reed",
          "lastName": "Walter",
          "email": "Alanis_Hammes78@yahoo.com",
          "phone": "290 158-2751"
        },
      ],
                  };
    this.onSort = this.onSort.bind(this);
  }
  componentWillMount() {
    // fetch(
    //   `https://randomapi.com/api/?key=N2PA-1WWP-TRC5-IZ4T&ref=ns4nmlcd&results=20`
    // )
    // .then(results => results.json())
    // .then(data => this.setState({ rows: data.results }));

    console.log(this.state.participants);
  }

  handleUserAdd = (participant) => {
    this.setState({participants: this.state.participants.concat(participant)});
  }
  handleUserDelete = (participant) => {
    let participants = this.state.participants;
    for(let i = 0; i < participants.length; i++){
      if(participants[i].id === participant.id){
        participants.splice(i, 1);
      }
    }
    this.setState({participants: participants});
  }
  handleUserEdit = (participant) => {
    this.setState({
      nameText: participant.firstName,
      emailText: participant.email,
      phoneText: participant.phone,
      isEdit: participant.id
    });
    console.log(participant);
  }
  handleChangeText = (text, ref) => {
    // this.setState({ text: text });
    if(ref === "name"){
      this.setState({nameText:text});
    } else if (ref === "email"){
      this.setState({emailText:text});
    } else if (ref === "phone"){
      this.setState({phoneText:text});
    }
    console.log(ref);
  }
  handleUserUpdate = (participant) => {
    let participants = this.state.participants;
    for(let i = 0; i < participants.length; i++){
      if(participants[i].id === participant.id){
        participants.splice(i, 1);
      }
    }
    participants.push(participant);
    this.setState({
      participants: participants,
      isEdit: 0,
    });
  }
  handleCancel = () => {
    this.setState({isEdit:0,});
  }



  onSort(column) {
      return (function (e) {
        console.log(this.state.participants);
        let direction = this.state.sort.direction;

        if (this.state.sort.column === column) {
          // Change the sort direction if the same column is sorted.
          direction = this.state.sort.direction === 'asc' ? 'desc' : 'asc';
        }

        // Sort ascending.
        const sortedData = this.state.participants.sort((a, b) => {
          if (column === 'name') {

            // This sorts strings taking into consideration numbers in strings.
            // e.g., Account 1, Account 2, Account 10. Normal sorting would sort it Account 1, Account 10, Account 2.
            const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

            return collator.compare(a.firstName, b.firstName);
          } else if (column==='email'){
            // This sorts strings taking into consideration numbers in strings.
            // e.g., Account 1, Account 2, Account 10. Normal sorting would sort it Account 1, Account 10, Account 2.
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


  render() {
    const headerStyle = {
      height: "48px",
      justifyText:"left",
      color: "#505050",
      fontSize:"14px",
      lineHeight: "16px",
      fontWeight: "500",
    }

    return (
      <div className="container">
        <Header/>
        <div className="content">
          <h2>List of Participants</h2>
          <UserForm
            {...this.state}
            changeText={this.handleChangeText}
            onUserAdd={this.handleUserAdd}
            onUserUpdate={this.handleUserUpdate}/>

          <table>
            <tbody>
            <tr style={headerStyle}>
                <td className="name" style={headerStyle} onClick={this.onSort('name')}>Name</td>
                <td className="email" style={headerStyle} onClick={this.onSort('email')}>Email</td>
                <td className="phone" style={headerStyle} onClick={this.onSort('phone')}>Phone</td>
                <td className="buttonColumn" style={headerStyle}></td>
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
    );
  }
}
