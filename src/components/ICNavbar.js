import React from 'react';
import {
    Nav,
    Navbar
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from "../assets/images/lowelllogo_horizontal_black_web.png";

function ICNavbar() {

    return (
        <Navbar className="color-nav" fixed="top" expand="lg">
            <Navbar.Brand href="#home">
                <img
                    src={logo}
                    width="115"
                    height="40"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="mr-auto">

                </Nav>
                <Navbar.Text>Lowell Discovery Telescope</Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default ICNavbar;