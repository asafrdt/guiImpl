import React from 'react'
import axios from "axios";
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

class FormSubmissions extends React.Component {
  // state variables
  state = {
    validated: false,
    setValidated: false,
    forms: {},
    responses: {},
    formId: '',
    name: ''
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch submissions
    axios.get("/submission/" + this.props.match.params.formId).then((response) => {
      this.setState({
        responses: response.data
      })

      Object.keys(response.data).slice(0, 1).map((key) => {
        this.setState({
          formId: response.data[key].formId,
          name: response.data[key].name
        });
      })
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  // generate table header
  generateTableHeader() {
    var responses = this.state.responses || {};
    var formControls = responses['formControls'];
    if (formControls != null) {
      let tableHeader = Object.keys(formControls).map((key) => {
        let thead = (
          <th key={key}>{formControls[key]['label']}</th>
        )
        return thead
      })
      return (
        <tr>
          {tableHeader}
        </tr>
      )
    }
  }

  // generate table row
  generateTableRow() {
    var responses = this.state.responses || {};
    var formControls = responses['formControls'];

    var tableRow = Object.keys(responses).slice(0, -1).map((key) => {
      var td = Object.keys(responses[key].response).map((key1) => {
        var control = formControls.find(control => control.name == key1);

        if (control['type'] == 'color') {
          var td = (
            <td key={key1} bgcolor={responses[key].response[key1]}>{responses[key].response[key1]}</td>
          )
          return td
        }
        else {
          var td = (
            <td key={key1}>{responses[key].response[key1]}</td>
          )
          return td
        }
      });

      return (
        <tr key={key}>
          {td}
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

export default FormSubmissions