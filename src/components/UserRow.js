import React, {Component} from 'react';
import Table, {
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderColumn,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';

export default class Row extends Component {
  editUser = (participant) => {
    this.props.editUser(participant);
  }
  hello = () => {
    console.log("fucking hell ");
  }
  render() {
    return(
      <React.Fragment>
      {
        this.props.participants.map(participant => {
          return <TableRow key={participant.id}>
                  <TableRowColumn>
                    {participant.firstName} {participant.lastName}
                  </TableRowColumn>
                  <TableRowColumn>
                    {participant.email}
                  </TableRowColumn>
                  <TableRowColumn>
                    {participant.phone}
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton onClick={()=>this.hello()} tooltip="Edit">
                      <ModeEditIcon/>
                    </IconButton>
                    <IconButton tooltip="Delete">
                      <DeleteIcon/>
                    </IconButton>
                  </TableRowColumn>
                </TableRow>})

      }
      </React.Fragment>
    )
  }
}
