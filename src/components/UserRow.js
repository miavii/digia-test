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
  onDelete = (participant) => {
    this.props.deleteUser(participant);
  }
  editUser = (participant) => {
    this.props.editUser(participant);
  }
  render() {
    return(
      <div>
      {
        this.props.participants.map(participant => {
          return <TableRow hover key={participant.id}>
                  <span>
                    <TableRowColumn>
                      {participant.firstName} {participant.lastName}
                    </TableRowColumn>
                    <TableRowColumn>
                      {participant.email}
                    </TableRowColumn>
                    <TableRowColumn>
                      {participant.phone}
                    </TableRowColumn>
                  </span>
                  <TableRowColumn>
                    <IconButton onClick={this.editUser.bind(this, participant)} tooltip="Edit">
                      <ModeEditIcon/>
                    </IconButton>
                    <IconButton onClick={this.onDelete(participant.id)} tooltip="Delete">
                      <DeleteIcon/>
                    </IconButton>
                  </TableRowColumn>
                </TableRow>})

      }
      </div>
    )
  }
}
