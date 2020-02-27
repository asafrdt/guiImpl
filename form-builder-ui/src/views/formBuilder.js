import React from 'react';
import DynamicForm from "../components/DynamicForm";
import { Button, Container, Row, Col, Form, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

class FormBuilder extends React.Component {

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
    formName: ''
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderFormAction = this.renderFormAction.bind(this);
    this.renderFormTitle = this.renderFormTitle.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.delete = this.delete.bind(this);
  }

  handleSelectionChange(event) {
    this.setState({ inputType: event.target.value });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

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

      stateInputs.push({ key: countx, label: this.state.labelName, name: this.state.inputName, type: this.state.inputType })
      this.setState({
        inputs: stateInputs,
        count: countx
      })

      console.log('label- ' + this.state.labelName + ' input -' + this.state.inputName + ' select- ' + this.state.inputType)

      document.getElementById("generation-form").reset();
      this.setState({
        validated: false,
        setValidated: false
      })
    }
    event.stopPropagation();
    event.preventDefault();
  }

  delete(val) {
    var modelArray = [...this.state.inputs]; // make a separate copy of the array
    var index = modelArray.indexOf(val) - 1;
    if (index !== -1) {
      modelArray.splice(index, 1);
      this.setState({ inputs: modelArray });
    }
  }

  saveForm(event) {
    console.log(this.state.inputs)

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({
        validatedGeneratedForm: true,
        setValidatedGeneratedForm: true
      })
    }

    if (form.checkValidity() === true) {

      var formObj = {
        formName: this.state.formName,
        inputs: this.state.inputs
      }

      console.log(this.state.formName)

      this.setState({
        validatedGeneratedForm: false,
        setValidatedGeneratedForm: false
      })
    }
    event.stopPropagation();
    event.preventDefault();
  }

  renderFormAction() {
    if (this.state.inputs.length > 0) {
      return (
        <div>
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
    if (this.state.inputs.length > 0) {
      return (<h2 id="generatedFormTitle" className="header">Generated Form</h2>)
    }
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

            // defaultValues={this.state.current}
            inputs={this.state.inputs}
            onSubmit={inputs => {
              this.onSubmit(inputs);
            }}
          ></DynamicForm>

          {this.renderFormAction()}
        </Container>

      </div>
    )
  }
}
export default FormBuilder