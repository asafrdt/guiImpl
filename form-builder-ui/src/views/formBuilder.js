import React from 'react';
import DynamicForm from "../components/DynamicForm";
import axios from 'axios';
import { Button, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { Redirect } from 'react-router-dom';

class FormBuilder extends React.Component {
  // state variables
  state = {
    inputs: [],
    count: 0,
    current: {},
    value: '',
    labelName: '',
    inputName: '',
    inputType: 'text',
    validated: false,
    validatedGeneratedForm: false,
    setValidated: false,
    setValidatedGeneratedForm: false,
    formName: '',
    redirect: false
  };

  constructor(props) {
    super(props);
    //binding state to methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderFormAction = this.renderFormAction.bind(this);
    this.renderFormTitle = this.renderFormTitle.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.delete = this.delete.bind(this);
  }

  // updating state on input change
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  // form submit action
  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({
        validated: true,
        setValidated: true
      })
    }

    if (form.checkValidity() === true) {

      var stateInputs = this.state.inputs;
      var countx = this.state.count;
      countx++;

      // adding created elements to state
      stateInputs.push({ key: countx, label: this.state.labelName, name: this.state.inputName, type: this.state.inputType })
      this.setState({
        inputs: stateInputs,
        count: countx,
        inputType: 'text',
        validated: false,
        setValidated: false
      })
    }

    document.getElementById("generation-form").reset();
    event.stopPropagation();
    event.preventDefault();
  }

  // delete button action
  delete(val) {
    var modelArray = [...this.state.inputs]; // make a separate copy of the array
    var index = modelArray.indexOf(val) - 1;
    if (index !== -1) {
      modelArray.splice(index, 1);
      this.setState({ inputs: modelArray });
    }
  }

  // save form action
  saveForm(event) {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({
        validatedGeneratedForm: true,
        setValidatedGeneratedForm: true
      })
    }

    if (form.checkValidity() === true) {
      var formObj = {
        "form": {
          "name": this.state.formName,
          "inputs": this.state.inputs
        }
      }
      this.setState({
        validatedGeneratedForm: false,
        setValidatedGeneratedForm: false
      })
      this.saveFormToDb(formObj)
    }
    event.stopPropagation();
    event.preventDefault();
  }

  //saving form data to db
  saveFormToDb(payload){
    axios.post('/form', {
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

  // redirection action
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/formList' />
    }
  }

  renderFormAction() {
    if (this.state.inputs.length > 0) {
      return (
        <div>
          {this.renderRedirect()}
          <hr />
          <Form id="generated-form" noValidate validated={this.state.validatedGeneratedForm} onSubmit={this.saveForm}>
            <Form.Group as={Row} controlId="">
              <Form.Label className="form-label" column md="3">
                Form Name
              </Form.Label>
              <Col md="7">
                <Form.Control
                  required
                  className="form-input"
                  type="text"
                  name="formName"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="centerContent" controlId="">
              <Col md="1">
                <button className="btn btn-success" type="submit">Save</button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      )
    }
  }

  renderFormTitle() {
      return (<h2 id="generatedFormTitle" className="header">Generated Form</h2>)
  }

  render() {
    return (
      <div>
        <h1 className="header">FormBuilder</h1>
        <Container className="generationForm" md="8">
          <Form id="generation-form" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row className="generationForm">
              <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Label</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    required
                    name="labelName"
                    placeholder="label name"
                    aria-label="Labelname"
                    aria-describedby="basic-addon1"
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Input</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    required
                    name="inputName"
                    placeholder="input name"
                    aria-label="Inputname"
                    aria-describedby="basic-addon1"
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Input Type</InputGroup.Text>
                  </InputGroup.Prepend>

                  <select className="form-control" name="inputType" onChange={this.handleChange}>
                    <option defaultValue value="text,">Text</option>
                    <option value="color">Color</option>
                    <option value="date">Date</option>
                    <option value="email">Email</option>
                    <option value="tel">Telephone</option>
                    <option value="number">Number</option>
                  </select>
                </InputGroup>
              </Form.Group>


              <Form.Group as={Col} md="1.5" controlId="validationCustomUsername">
                <InputGroup>
                  <Button type="submit" className="btn btn-primary">Add Field</Button>
                </InputGroup>
              </Form.Group>
            </Form.Row>
          </Form>

        </Container>

        <Container className="generatedForm" as={Col} md="5">
          {this.renderFormTitle()}

          <DynamicForm
            delete={this.delete}
            key={this.state.current.id}
            className="form"
            title="Registration"
            deleteButtons="true"
            inputs={this.state.inputs}
          ></DynamicForm>

          {this.renderFormAction()}
        </Container>

      </div>
    )
  }
}
export default FormBuilder