import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table, {
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderColumn,
  TableRowColumn,
} from 'material-ui/Table';
import Header from './components/Header.js';
import UserForm from './components/Form.js';
import Row from './components/UserRow.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { text: 'biiiiitch',
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
  }
  componentWillMount() {
    // fetch(
    //   `https://randomapi.com/api/?key=N2PA-1WWP-TRC5-IZ4T&ref=ns4nmlcd&results=20`
    // )
    // .then(results => results.json())
    // .then(data => this.setState({ rows: data.results }));

    console.log(this.state.rows);
  }

  handleUserAdd = (participant) => {
    this.setState({rows: this.state.rows.concat(participant)});
  }
  handleUserDelete = (participant) => {
    let participants = this.state.participants;
    for(let i = 0; i < participants.length; i++){
      console.log(participant.id);
      if(participants[i].id === participant.id){
        console.log(participants[i]);
        participants.splice(i, 1);
      }
    }
    this.setState({participants: participants});
  }

  handleUserEdit = (row) => {
    this.setState({
      nameText: row.firstName,
      emailText: row.email,
      phoneText: row.phone,
      isEdit: row.id
    });
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
    this.setState({participants: participants});
  }

  render() {
    return (

      <div className="container">
        <Header/>
        <div className="content">
          <h1>{this.state.text}</h1>
          <UserForm
            {...this.state}
            changeText={this.handleChangeText}
            onUserAdd={this.handleUserAdd}
            onUserUpdate={this.handleUserUpdate}/>
          <Table selectable="false">
            <TableHeader >
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Phone</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover='true' >
              <Row
              {...this.state}
              deleteUser={this.handleUserDelete}
              editUser={this.handleUserEdit} />
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}
