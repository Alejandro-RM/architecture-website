import Axios from 'axios';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import NavigationBar from '../widgets/NavigationBar.jsx';
import Footer from '../widgets/Footer.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const user = (await Axios.get('/sessions/user')).data;
const Home = () => {
	return (<>
		<NavigationBar user={user}/>
		<Footer/>
	</>);
};

const root_container = document.getElementById('root');
const application_root = ReactDOMClient.createRoot(root_container);
application_root.render(<Home/>);