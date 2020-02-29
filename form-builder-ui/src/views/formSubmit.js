import React from 'react'
import axios from "axios";
import DynamicForm from "../components/DynamicForm";
import { Container, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { Redirect } from 'react-router-dom';

class FormSubmit extends React.Component {
  // state variables
  state = {
    inputs: [],
    count: 0,
    current: {},
    validated: false,
    setValidated: false,
    formName: '',
    formId: ''
  };

  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  // fetch form
  componentDidMount() {
    axios.get("/form/" + this.props.match.params.formId).then((response) => {
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

  // submit form action
  submitForm(input) {
    var form = this.state.inputs;
    var response = {};

    Object.keys(form).map((key) => {
      var feildName = form[key].name;
      var res = input[form[key].key];
      if(feildName == 'color' && res == null){
        response[feildName] = '#000000'
      }else{
        response[feildName] = res;
      }
    });

    var submissionObj = {
      "form": {
        "formId": this.state.formId,
        "name": this.state.formName,
        "response": response
      }
    }
    this.saveSubmissionToDb(submissionObj)
  }

  // save input data to db
  saveSubmissionToDb(payload) {
    axios.post('/submit', {
      payload: payload
    }).then((response) => {
      setTimeout(() => {
        this.setState({
          redirect: true
        })
      }, 2000);
    })
  }

  // redirect action
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
        <DynamicForm
          key={this.state.current.id}
          className="form"
          inputs={this.state.inputs}
          submitBtn="true"
          submitBtnText="Submit Form"
          onSubmit={inputs => {
            this.submitForm(inputs);
          }}
        ></DynamicForm>
      </Container>
    )
  }
}
export default FormSubmit