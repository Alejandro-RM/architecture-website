import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';
import { OverlayTrigger } from 'react-bootstrap';

import 'bootstrap-icons/font/bootstrap-icons.css'

// Element for conditional rendering of login/logout buttons
// or user name, settings and logout button
const UserButtons = () => {{/*{user}*/}
	{/*if (user.role === 'guest')*/}
		return (<>
			{/* Login button with tooltip */}
			<OverlayTrigger placement='left' overlay={
				<Tooltip id='login-tooltip'>Iniciar sesión</Tooltip>
			}>
				<Nav.Link href='/sessions/login'>
					<i className='bi bi-box-arrow-in-right'/>
				</Nav.Link>
			</OverlayTrigger>

			{/* Sign up button with tooltip */}
			<OverlayTrigger placement='left' overlay={
				<Tooltip id='signup-tooltip'>Registrarse</Tooltip>
			}>
				<Nav.Link href='/sessions/signup'>
					<i className='bi bi-person-plus'/>
				</Nav.Link>
			</OverlayTrigger>
		</>);
	{/*else
		return (<>
			<NavDropdown title={user.name} id='basic-nav-dropdown'>
				<NavDropdown.Item href='/sessions/logout'>
					<i className='bi bi-box-arrow-right'/>
				</NavDropdown.Item>
			</NavDropdown>
		</>);*/}
};

// Navigation bar
const NavigationBar = ({/*{user}*/}) => {
	return (
		<header>
		<Navbar expand='lg'>{/* bg={user.preferences.theme} variant={user.preferences.theme} */}
			<Stack direction='horizontal' gap={2} className='mx-3 w-100'>
				<Navbar.Brand href='/'>
					<img src='/logo192.png' width='32' height='32' className='d-inline-block align-top m-2'/>
					Arquitectura Siglo XIX
				</Navbar.Brand>
				<Navbar.Toggle className='ms-auto' aria-controls='basic-navbar-nav'/>
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav>
						<Nav.Link href='/buildings'>Construcciones</Nav.Link>
						<Nav.Link href='/architects-and-builders'>Arquitectos y Constructoras</Nav.Link>
						<Nav.Link href='/architectural-spaces'>Espacios Arquitectónicos</Nav.Link>
					</Nav>
					<Nav className='ms-auto'>
						<UserButtons/>{/*user={user}*/}
						<NavDropdown title='Otros enlaces' id='basic-nav-dropdown' className='ms-auto'>
							<NavDropdown.Item href='/about'>Acerca de...</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Stack>
		</Navbar>
		</header>
	);
};

export default NavigationBar;