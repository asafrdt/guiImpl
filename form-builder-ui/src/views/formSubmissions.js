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

  componentDidMount() {
    // fetch submissions
    axios.get("/submission/" + this.props.match.params.formId).then((response) => {
      this.setState({
        responses: response.data
        //{"5e5f5bf207d33042b4e93575":
        //{"formId":"1","name":"General Form","response":
        //{"Name":"Asaf Arditi","Birthday":"1993-08-23","email":"asafrdt@gmail.com","phone":"054-3476767","age":"26","color":"#21c529"}},"5e5f5d13d9d49000492056a4":{"formId":"1","name":"General Form","response":{"Name":"Maya Goren","Birthday":"1993-03-06","email":"Mayagoren93@gmail.com","phone":"052-4348954","age":"27","color":"#ff0000"}},"5e5f74a81a0fcc00248aba3d":{"formId":"1","name":"General Form","response":{"Name":"Omer Cohen","Birthday":"1993-03-23","email":"omer@gmail.com","phone":"053-2323223","age":"23","color":"#ffff00"}},"5e5f8c0fabbfed18801d7176":{"formId":"1","name":"General Form","response":{"Name":"yoni","Birthday":"1992-01-01","email":"angeladir@asd.co.il","phone":"052-5664785","age":"23","color":"#8000ff"}},"formControls":[{"key":1,"label":"Name","name":"Name","type":"text"},{"key":2,"label":"Date Of Birth","name":"Birthday","type":"date"},{"key":3,"label":"E-Mail","name":"email","type":"email"},{"key":4,"label":"Mobile","name":"phone","type":"tel"},{"key":5,"label":"Age","name":"age","type":"number"},{"key":6,"label":"Favorite Color","name":"color","type":"color"}]}
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
        var control = formControls.find(control => control.name === key1);
        var td = "";
        if (control['type'] === 'color') {
           td = (
            <td key={key1} bgcolor={responses[key].response[key1]}>{responses[key].response[key1]}</td>
          )
          return td
        }
        else {
           td = (
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
        <h1 className="header">{this.state.name} Submissions Page</h1>
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