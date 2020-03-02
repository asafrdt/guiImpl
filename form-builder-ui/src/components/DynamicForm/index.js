import React from "react";
import "./form.css";
import { Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DynamicForm extends React.Component {
  // state variables
  state = {
    validated: false,
    setValidated: false,
  };

  constructor(props) {
    super(props);
    this.del = this.del.bind(this);
  }

  // form submit action
  onSubmitForm = e => {
    e.stopPropagation();
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({
        validated: true,
        setValidated: true
      })
    } else {
      this.props.onSubmit(this.state);
    }
  }


  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  // input onchange action
  onChange = (e, key) => {
    this.setState(
      {
        [key]: e.target.value
      },
      () => { }
    );
  };

  // delete button action
  del = ({ target }) => {
    this.setState({ [target.name]: target.value });
    this.props.delete(target.id);

  };

  renderForm = () => {
    var inputs = this.props.inputs;
    var formUI = inputs.map(m => {
      var key = m.key;
      var type = m.type || "text";
      var name = m.name;
      var label = m.label;
      var value = m.value;

      let target = key;
      value = this.state[target] || "";
      var pl = "Please enter a " + type;
      var feedback = "Please enter a valid " + type;

      var input = "";
      if (type === "tel") {
        feedback = "Please tel eg: 054-1234567"

        input = (
          <Form.Control
            pattern="[0-9]{3}-[0-9]{7}"
            required
            className="form-input"
            placeholder={pl}
            type={type}
            key={key}
            name={name}
            value={value}
            onChange={e => {
              this.onChange(e, target);
            }} />
        );
      }
      else {
        input = (
          <Form.Control
            required
            className="form-input"
            placeholder={pl}
            type={type}
            key={key}
            name={name}
            value={value}
            onChange={e => {
              this.onChange(e, target);
            }} />
        );
      }

      return (
        <Form.Group as={Row} key={"g" + key} controlId="">
          <Form.Label className="form-label" key={"l" + key} column md="3">
            {label}
          </Form.Label>
          <Col md="7">
            {input}
            <Form.Control.Feedback type="invalid">
              {feedback}
            </Form.Control.Feedback>
          </Col>
          {this.renderDeleteButton(key)}
        </Form.Group>
      );
    });
    return formUI;
  };

  renderSubmitButton = () => {
    if (this.props.submitBtn === "true") {
      return (
        <Form.Group as={Row} className="centerContent" controlId="">
          <Col md="1">
            <button className="btn btn-success" type="submit">Save</button>
          </Col>
        </Form.Group>
      )
    }
  }

  renderDeleteButton = (key) => {
    if (this.props.deleteButtons === "true") {
      return (
        <Col md="1">
          <button id={key} className="btn btn-danger" type="button" onClick={this.del}>Delete</button>
        </Col>
      )
    }
  }

  render() {
    return (
      <div>
        <Form id="generated-form" noValidate validated={this.state.validated} onSubmit={this.onSubmitForm}>
          {this.renderForm()}
          {this.renderSubmitButton()}
        </Form>
      </div>
    );

  }
}
export default DynamicForm