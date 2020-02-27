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
    let model = this.props.model;
    // let defaultValues = this.props.defaultValues;

    let formUI = model.map(m => {
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
          <Form.Label key={"l" + key} column md="2">
            {label}
          </Form.Label>
          <Col md="8">
            {input}
          </Col>
          <Col md="1">
            <button id={key} className="btn btn-danger" type="button" onClick={this.del}>Delete</button>
          </Col>
        </Form.Group>
      );
    });
    return formUI;
  };

  render() {
    let title = this.props.title || "Dynamic Form";

    return (
      <div>
     
          <Form  md="12">
            {this.renderForm()}
          </Form>
        
      </div>
    );
  }
}

export default DynamicForm