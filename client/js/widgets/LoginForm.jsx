import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from 'react-bootstrap/Tooltip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { OverlayTrigger } from 'react-bootstrap';

import 'bootstrap-icons/font/bootstrap-icons.css';

const LoginForm = () => {
	const [validated, setValidated] = React.useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if(form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	return (
		<section>
		<Form action='/sessions/login' method='POST' noValidate validated={validated} onSubmit={handleSubmit}>
			{/* Email field */}
			<Row className="mb-3">
				<Form.Group controlId='email' as={Col}>
					<Form.Label>Correo</Form.Label>
					<InputGroup hasValidation>
						<OverlayTrigger placement='right' overlay={
							<Tooltip id='email-tooltip'>Introduce tu email</Tooltip>
						}>
							<InputGroup.Text><i className='bi bi-envelope'/></InputGroup.Text>
						</OverlayTrigger>
						<Form.Control type='email' name='email' placeholder='Introduce tu email' required/>
					</InputGroup>
				</Form.Group>
			</Row>

			{/* Password field */}
			<Row className="mb-3">
				<Form.Group controlId='password' as={Col}>
					<Form.Label>Contraseña</Form.Label>
					<InputGroup hasValidation>
						<OverlayTrigger placement='right' overlay={
							<Tooltip id='password-tooltip'>Introduce tu contraseña</Tooltip>
						}>
							<InputGroup.Text><i className='bi bi-key'/></InputGroup.Text>
						</OverlayTrigger>
						<Form.Control type='password' name='password' placeholder='Introduce tu contraseña' required/>
					</InputGroup>
				</Form.Group>
			</Row>

			{/* Submit button */}
			<Row className="mb-3">
				<Button type='submit'>Iniciar sesión</Button>
			</Row>
		</Form>
		</section>
	);
}

export default LoginForm;