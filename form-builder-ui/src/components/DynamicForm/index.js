import React from "react";
import ReactDOM from "react-dom";
import "./form.css";
import { Button, Container, Row, Col, Form, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DynamicForm extends React.Component {

  state = {};
 
  constructor(props) {
    super(props);
    this.del = this.del.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  onChange = (e, key) => {
    console.log(`${key} changed ${e.target.value}`);
    this.setState(
      {
        [key]: e.target.value
      },
      () => { }
    );
  };

  del = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(target.id)
    this.props.delete(target.id);

  };

  renderForm = () => {
    let inputs = this.props.inputs;
    // let defaultValues = this.props.defaultValues;
    let formUI = inputs.map(m => {
      let key = m.key;
      let type = m.type || "text";
      //   let props = m.props || {};
      let name = m.name;
      let label = m.label;
      let value = m.value;

      let target = key;
      value = this.state[target] || "";

      let input = (

        <Form.Control
          //   {...props}
          className="form-input"
          type={type}
          key={key}
          name={name}
          value={value}
          onChange={e => {
            this.onChange(e, target);
          }} />
      );

      return (
        <Form.Group key={"g" + key} as={Row} controlId="">
            <InputGroup>
          <Form.Label className="form-label" key={"l" + key} column md="3">
            {label}
          </Form.Label>
          <Col md="7">
            {input}
            <Form.Control.Feedback type="invalid">
                    Please choose a username.
                </Form.Control.Feedback>
          </Col>
          {this.renderDeleteButton({ key })}
          </InputGroup>
        </Form.Group>
      );
    });
    return formUI;
  };

  renderSubmitButton = (key) => {
    if (this.props.submitBtnClick != null) {
      return (
        <Row className="centerContent">
          <button className="btn btn-primary" type="submit">{this.props.submitBtnText}</button>
        </Row>
      )
    }
  }

  renderDeleteButton = (key) => {
    if (this.props.deleteButtons == "true") {
      return (
        <Col md="1">
          <button id={key} className="btn btn-danger" type="button" onClick={this.del}>Delete</button>
        </Col>
      )
    }
  }

  render() {
    let title = this.props.title || "Dynamic Form";
    return (
      <div>
        <Form md="12" id={this.props.formId} noValidate validated={this.props.validated} onSubmit={this.props.onSubmit}>
          {this.renderForm()}
          {this.renderSubmitButton()}
        </Form>
      </div>
    );
  }
}

export default DynamicForm