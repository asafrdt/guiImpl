import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { FormBuilder, FormSubmissions, FormList, FormSubmit } from './views';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

const routing = (

    <Router>
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">React-Form-Builder</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Form-Builder</Nav.Link>
                    <Nav.Link href="/formList">Form-List</Nav.Link>
                    <Nav.Link href="/auth/github">Github login</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" component={FormBuilder} />
        <Route path="/formList" component={FormList} />
        <Route path="/submissions/:formId" component={FormSubmissions} />
        <Route path="/submit/:formId" component={FormSubmit}/> 
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
