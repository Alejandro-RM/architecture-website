import Axios from 'axios';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import NavigationBar from '../widgets/NavigationBar.jsx';
import Footer from '../widgets/Footer.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const user = (await Axios.get('/sessions/user')).data;
const Error = () => {
	return (<>
		<NavigationBar user={user}/>
		<main>
            <Container className='text-center w-100 h-100 p-5'>
                <h1>{`Error: ${error_information.status}`}</h1>
                <p>{`${error_information.message}`}</p>
                <p>{`${error_information.please_report}`}</p>
            </Container>
		</main>
		<Footer/>
	</>);
}

const root_container = document.getElementById('root');
const application_root = ReactDOMClient.createRoot(root_container);
application_root.render(<Error/>);