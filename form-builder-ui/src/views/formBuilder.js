import React from 'react';
import DynamicForm from "../components/DynamicForm";
import { Button, Container, Row, Col, Form, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

class FormBuilder extends React.Component {

  state = {
    model: [
      { key: "name", label: "Name", type: "text" },
      { key: "age", label: "Age", type: "number" }
    ],
    count: 2,
    current: {},
    value: '',
    labelName: '',
    inputName: '',
    inputType: 'grapefruit',
    validated: false,
    setValidated: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

      var stateModels = this.state.model;
      var countx = this.state.count;
      countx++;

      stateModels.push({ key: countx, label: this.state.labelName, name: this.state.inputName, type: this.state.inputType })
      this.setState({
        model: stateModels,
        count: countx
      })

      console.log('label- ' + this.state.labelName + ' input -' + this.state.inputName + ' select- ' + this.state.inputType)

      document.getElementById("create-course-form").reset();
      this.setState({
        validated: false,
        setValidated: false
      })
    }
    event.stopPropagation();
    event.preventDefault();
  }

  delete(val) {
    console.log('vvv - ' + val)
    var modelArray = [...this.state.model]; // make a separate copy of the array
    var index = modelArray.indexOf(val) - 1;
    if (index !== -1) {
      modelArray.splice(index, 1);
      this.setState({ model: modelArray });
    }
    console.log('ddd ')
    console.log(this.state.model)

  }

  render() {

    return (
      <div>
        <h1 className="header">FormBuilder</h1>

        <Container className="generationForm" md="8">

          <Form id="create-course-form" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
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
          {/* <Button onClick={add.bind(this)}>Add</Button> */}
          <DynamicForm
            delete={this.delete}
            key={this.state.current.id}
            className="form"
            title="Registration"
            // defaultValues={this.state.current}
            model={this.state.model}
            onSubmit={model => {
              this.onSubmit(model);
            }}
          ></DynamicForm>
       </Container>

      </div>
    )
  }
}
export default FormBuilder