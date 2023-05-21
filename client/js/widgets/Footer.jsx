import React from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const Footer = () => {
	return (
		<footer className='text-center text-bg-secondary'>
		<Container className='px-4 py-5'>
			<ListGroup horizontal className='d-inline-flex justify-content-center'>
				<ListGroup.Item action href='https://www.unam.mx' className='d-inline-flex my-2'>
					<img src='/images/UNAM.png' width='32px' height='32px' className='m-2'/>
				</ListGroup.Item>
				<ListGroup.Item action href='https://www.acatlan.unam.mx' className='d-inline-flex my-2'>
					<img src='/images/FES-Acatlan.png' width='128px' height='32px' className='m-2'/>
				</ListGroup.Item>
				<ListGroup.Item action href='#' className='d-inline-flex align-items-center justify-content-center my-2'>
					<i className='bi bi-facebook'/>
				</ListGroup.Item>
				<ListGroup.Item action href='#' className='d-inline-flex align-items-center justify-content-center my-2'>
					<i className='bi bi-twitter'/>
				</ListGroup.Item>
				<ListGroup.Item action href='#' className='d-inline-flex align-items-center justify-content-center my-2'>
					<i className='bi bi-instagram'/>
				</ListGroup.Item>
			</ListGroup>
			<p>© 2021 - 2022</p>
		</Container>
		</footer>
	);
}

export default Footer;