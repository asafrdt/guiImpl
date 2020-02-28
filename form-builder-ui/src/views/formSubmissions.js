import React from 'react'
import axios from "axios";
import { Button, Container, Row, Col, Table, Form, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

class FormSubmission extends React.Component {

  state = {
    validated: false,
    setValidated: false,
    forms: {},
    responses: {},
    formId:'',
    name:''
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get("/submissions/" + this.props.match.params.formId).then((response) => {
      // console.log(response);
      this.setState({
        responses: response.data
      })

      Object.keys(response.data).slice(0, 1).map((key) => {
        // console.log(key)
        console.log(key)
  
        this.setState({
          formId:response.data[key].formId,
          name:response.data[key].name
        });
      })
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  generateTableHeader() {
    let responses = this.state.responses || {};

    let tableHeader = Object.keys(responses).slice(0, 1).map((key) => {

      let thead = Object.keys(responses[key].response).map((key1) => {

        let thead = (
          <th key={key1}>{key1}</th>
        )
        return thead
      });

      return (
        <tr key={key}>
          {thead}
        </tr>
      )
    })
    return tableHeader;
  }

  generateTableRow() {
    let responses = this.state.responses || {};

    let tableRow = Object.keys(responses).map((key) => {

      let thead = Object.keys(responses[key].response).map((key1) => {

        let thead = (
          <td key={key1}>{responses[key].response[key1]}</td>
        )
        return thead
      });

      return (
        <tr key={key}>
          {thead}
        </tr>
      )
    })
    return tableRow;
  }

  render() {
    return (
      <Container>
        <h1 className="header">{this.state.name} Submissions</h1>
        <Table striped bordered hover>
          <thead>
            {this.generateTableHeader()}
          </thead>

          <tbody >
            {this.generateTableRow()}
          </tbody >

        </Table>
      </Container >
    )
  }

}
export default FormSubmission