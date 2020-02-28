import React, { useState, ControlLabel } from 'react'
// import Form1 from './form';
import { Button, Container, Row, Col, Table, InputGroup, Form, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class FormList extends React.Component {

  state = {
    validated: false,
    setValidated: false
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({
      validated: true,
      setValidated: true
    })
  }

  render() {
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Form Id</th>
              <th>Form Name</th>
              <th># Submissions</th>
              <th>Submit Page</th>
              <th>Submissions Page</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    )
  }

}

export default FormList