import React from 'react'
import axios from "axios";
import DynamicForm from "../components/DynamicForm";
import { Button, Container, Row, Col, Form, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { Redirect } from 'react-router-dom';

class FormSubmit extends React.Component {

  state = {
    inputs: [],
    count: 0,
    current: {},
    validated: false,
    setValidated: false,
    formName: '',
    formId:''
  };

  constructor(props){
    super(props)
    console.log(this.props.match.params.formId)
    this.submitForm = this.submitForm.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    // this.setState({
    //   formId:this.props.match.params.formId
    // })
  }

  async componentDidMount() { 
   await axios.get("/form/"+this.props.match.params.formId).then((response) => {
      console.log(response);
      this.setState({
        inputs: response.data.inputs,
        formName: response.data.name,
        formId: response.data.formId,
      })
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  submitForm(input){
    console.log('clcik')
    console.log(input)
    console.log(this.state.inputs)
    
    var form = this.state.inputs;
    var response = {};

    Object.keys(form).map((key) => {

      var feildName =form[key].name;
      var res = input[form[key].key];

      response[feildName] = res ;
    });
   
    console.log(response)
    console.log(response['name'])

    var submissionObj = {
      "form": {
        "formId": this.state.formId,
        "name": this.state.formName,
        "response": response
      }
    }

    console.log(submissionObj)
    this.saveSubmissionToDb(submissionObj)
  }

  saveSubmissionToDb(payload){
    axios.post('/submit', {
      payload: payload
    }).then((response) => {
      console.log(response);
      setTimeout(() => {
        this.setState({
          redirect: true
        })
      }, 3000);
    })
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/formList' />
    }
  }

  render() {
    return (
      <Container className="generatedForm" as={Col} md="5">
      {this.renderRedirect()}
      <h1 className="header">{this.state.formName}</h1>
      {/* <DynamicForm
        // delete={this.delete}
        key={this.state.current.id}
        validated = {this.state.validated} 
        // onSubmit={this.saveForm}
        formId="submission-form"

        className="form"
        title="Registration"

        // defaultValues={this.state.current}
        inputs={this.state.inputs}
        submitBtnClick={this.submitForm}
        submitBtnText = "Submit Form"
        onSubmit={inputs => {
          this.submitForm(inputs);
        }}
      ></DynamicForm> */}
        <DynamicForm
            delete={this.delete}
            key={this.state.current.id}
            className="form"
            // defaultValues={this.state.current}
            inputs={this.state.inputs}
            submitBtn= "true"
            submitBtnText="Submit Form"
           
            onSubmit={inputs => {
              this.submitForm(inputs);
            }}
          ></DynamicForm>
      {/* {this.renderFormAction()} */}
    </Container>
    )
  }
}
export default FormSubmit