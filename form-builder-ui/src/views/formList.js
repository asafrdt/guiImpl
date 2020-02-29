import React from 'react'
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class FormList extends React.Component {
  //state variables
  state = {
    validated: false,
    setValidated: false,
    forms: {}
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //fetxhing forms
    axios.get('/forms').then((response) => {
      this.setState({
        forms: response.data
      })
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  // generate table
  generateTable() {
    var forms = this.state.forms;
    var tableRow = Object.keys(forms).map((key) => {

      return (
        <tr key={key}>
          <td>{forms[key]['formId']}</td>
          <td>{forms[key]['name']}</td>
          <td>{forms[key]['submissionCount']}</td>
          <td><u><a href={"/submit/" + forms[key]['formId']}>View</a></u></td>
          <td><u><a href={"/submissions/" + forms[key]['formId']}>View</a></u></td>
        </tr>
      )
    })

    return tableRow;
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