import React from 'react'
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';

class FormList extends React.Component {
  //state variables
  state = {
    validated: false,
    setValidated: false,
    forms: {},
    formName: '',
    formId: ''
  };

  componentDidMount() {
    //fetching forms
    axios.get('/forms').then((response) => {
      this.setState({
        forms: response.data
      })
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/formList' />
    }
  }
  HandaleDeleteButton = ( id ) => {
    axios.delete("/deleteForm/"+id).then((response) => {
      this.setState({
        redirect: true
      })
    }).catch(function (error) {
      // handle error
      console.log(error);
    })

  // generate table of Form list
  };
 
  // generate table
  generateTable() {
    var forms = this.state.forms;
    console.log("forms:" + Object.keys(forms).length);

    var tableRow = Object.keys(forms).map((key) => {
 
  
 
      return (
        <tr key={key}>
          <td><center>{forms[key]['formId']}</center></td>
          <td><center>{forms[key]['name']}</center></td>
          <td><center>{forms[key]['submissionCount']}</center></td>
          <td><u><center><a href={"/submit/" + forms[key]['formId']}>View</a></center></u></td>
          <td><u><center><a href={"/submissions/" + forms[key]['formId']}>View</a></center></u></td>
          <td><u><center><Button type="submit" className="btn btn-primary" variant='danger' onClick={() => this.HandaleDeleteButton(forms[key]['formId'])}>Delete</Button></center></u></td>
          <td><u><center><Button type="submit" className="btn btn-primary" >Edit</Button></center></u></td>

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
              <th><center>Form Id</center></th>
              <th><center>Form Name</center></th>
              <th><center># Submissions</center></th>
              <th><center>Submit Page</center></th>
              <th><center>Submissions Page</center></th>
              <th></th>
              <th></th>
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