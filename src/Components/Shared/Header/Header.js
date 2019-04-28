/* eslint-disable no-tabs */
import React from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Header = (props) => {
	return (
		<Navbar collapseOnSelect expand="lg" fixed="top" className="Navbar" >
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<h1 className="text-light"><b>Good</b>Reads</h1>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2 search" />
				</Form>
				{/* <h3><i className="fas fa-user"></i></h3>
				<h3>user 1</h3>
				<h3><i className="fas fa-arrow-alt-circle-right"></i></h3> */}
				{/* <Nav.Link as="div" >
					<Link className="login-btn" to="/login">Login </Link>
				</Nav.Link> */}
			</Navbar.Collapse>
		</Navbar>
	)
}
export default Header;
