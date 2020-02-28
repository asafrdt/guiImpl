import React, { useState, ControlLabel } from 'react'
import axios from 'axios';
import { Button, Container, Row, Col, Table, InputGroup, Form, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class FormList extends React.Component {

  state = {
    validated: false,
    setValidated: false,
    forms: {}
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getForm = this.getForm.bind(this);
  }

  componentDidMount() {
    axios.get('/forms').then((response) => {
      console.log(response);
      this.setState({
        forms: response.data
      })
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
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

  generateTable() {
    console.log(this.state.forms)
    let forms = this.state.forms;

    let tableRow = Object.keys(forms).map((key) => {
      // console.log(froms[key])
      console.log(forms[key]['formId'])
      console.log(forms[key]['name'])
      var inputs = forms[key]['inputs'];

      forms[key]['inputs'].map((input) => {
      console.log(input)
    });

    return (
      <tr key={key}>
        <td>{forms[key]['formId']}</td>
        <td>{forms[key]['name']}</td>
        <td>0</td>
        {/* <td><button value={forms[key]['formId']} onClick={this.getForm}>ll</button></td> */}
        <td><u><a href={"/submit/"+forms[key]['formId']}>View</a></u></td>
        <td><u><a href={"/submissions/"+forms[key]['formId']}>View</a></u></td>
      </tr>
    )
  })

    return tableRow;
  }

  getForm(event){
    console.log('response');
    console.log(event.target.value);
    var formId= event.target.value;

    axios.get('/form?formId='+formId).then((response) => {
      console.log(response);
      // this.setState({
      //   forms: response.data
      // })
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }

render() {
  return (
    <Container>
      <h1 className="header">Form List</h1>
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

        <tbody >
          {this.generateTable()}
        </tbody >

      </Table>
    </Container >
  )
}

}

export default FormList