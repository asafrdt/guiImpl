import React from "react";
import ReactDOM from "react-dom";
import "./form.css";
import { Button, Container, Row, Col, Form, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DynamicForm extends React.Component {

  state = {
    validated: false,
    setValidated: false,
  };

  constructor(props) {
    super(props);
    this.del = this.del.bind(this);
  }

  onSubmitTest = e => {
    e.stopPropagation();
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({
        validated: true,
        setValidated: true
      })
      console.log('false')
    } else {
      this.props.onSubmit(this.state);
      console.log('true')
      //submit
    }

  }


  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
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
      var pl = "Please enter a " + type;
      var pattern = "*";
      var feedback = "Please enter a valid " + type;

      var input = "";
      if (type == "tel") {
        feedback = "Please tel eg: 111-22-333"

        input = (
          <Form.Control
            //   {...props}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
            //   {...props}
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
        // <Form.Group key={"g" + key} as={Row} controlId="">
        //   <InputGroup>
        //     <Form.Label className="form-label" key={"l" + key} column md="3">
        //       {label}
        //     </Form.Label>
        //     <Col md="7">
        //       required
        //       <Form.Control.Feedback type="invalid">
        //         Please choose a username.
        //           </Form.Control.Feedback>
        //     </Col>
        //     {this.renderDeleteButton({ key })}
        //   </InputGroup>
        // </Form.Group>


        <Form.Group as={Row} key={"g" + key} controlId="">
          <Form.Label className="form-label" key={"l" + key} column md="3">
            {label}
          </Form.Label>
          <Col md="7">
            {/* <Form.Control
              required
              className="form-input"
              type="text"
              name="formName"
            // onChange={this.handleChange}
            /> */}
            {input}
            <Form.Control.Feedback type="invalid">
              {feedback}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>


      );
    });
    return formUI;
  };

  renderSubmitButton = () => {
    if (this.props.submitBtn == "true") {
      return (
        // <Row className="centerContent">
        //   <button className="btn btn-primary" type="submit">{this.props.submitBtnText}</button>
        // </Row>
        <Form.Group as={Row} className="centerContent" controlId="">
          <Col md="1">
            <button className="btn btn-success" type="submit">Save</button>
          </Col>
        </Form.Group>
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
    return (
      <div>
        {/* <Form md="12" id={this.props.formId} noValidate validated={this.props.validated} onSubmit={this.onSubmitTest}>
        {this.renderForm()}
        {this.renderSubmitButton()}
      </Form> */}
        <Form id="generated-form" noValidate validated={this.state.validated} onSubmit={this.onSubmitTest}>
          {this.renderForm()}
          {this.renderSubmitButton()}
        </Form>
      </div>
    );

  }
}
export default DynamicForm