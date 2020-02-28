import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { FormBuilder, FormSubmissions, FormList, FormSubmit } from './views';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

const routing = (

    <Router>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">React-Form-Builder</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/formBuilder">Form-Builder</Nav.Link>
                    <Nav.Link href="/formList">Form-List</Nav.Link>
                    <Nav.Link href="/submissions">Form-Submissions</Nav.Link>
                    <Nav.Link href="/submit">Submit-Form</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={App} />
        <Route path="/formBuilder" component={FormBuilder} />
        <Route path="/formList" component={FormList} />
        <Route path="/submissions/:formId" component={FormSubmissions} />
        <Route path="/submit/:formId" component={FormSubmit} />

    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
