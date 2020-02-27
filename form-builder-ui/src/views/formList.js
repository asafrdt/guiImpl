import React, { useState, ControlLabel } from 'react'
// import Form1 from './form';
import { Button, Container, Row, Col, InputGroup, Form, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class FormList extends React.Component {

  state = {
    validated: false,
    setValidated: false
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({
      validated: true,
      setValidated: true
    })
  }

  render() {
    return (
      <Container>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
                // onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
                // onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Input</InputGroup.Text>
                </InputGroup.Prepend>

                <select required className="form-control" name="inputType" onChange={this.handleChange}>
                  <option defaultValue value="grapefruit">Grapefruit</option>
                  <option value="lime">Lime</option>
                  <option value="coconut">Coconut</option>
                  <option value="mango">Mango</option>
                </select>

              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </Container>
    )
  }

}

export default FormList