import React from 'react'
import axios from "axios";
import DynamicForm from "../components/DynamicForm";
import { Button, Container, Row, Col, Form, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
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
    // this.setState({
    //   formId:this.props.match.params.formId
    // })
  }

  componentDidMount() { 
    axios.get("/form/"+this.props.match.params.formId).then((response) => {
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

  submitForm(event){
    console.log('clcik')
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({
        validated: true,
        setValidated: true
      })
      event.stopPropagation();
      event.preventDefault();
    }

    if (form.checkValidity() === true) {

      // var formObj = {
      //   "form": {
      //     "name": this.state.formName,
      //     "inputs": this.state.inputs
      //   }
      // }

      // console.log(this.state.formName)

      this.setState({
        validated: false,
        setValidated: false
      })
      // this.saveFormToDb(formObj)/
    }
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    return (
      <Container className="generatedForm" as={Col} md="5">
      <h1 className="header">{this.state.formName}</h1>
      <DynamicForm
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
      ></DynamicForm>

      {/* {this.renderFormAction()} */}
    </Container>
    )
  }
}
export default FormSubmit