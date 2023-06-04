import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

const Footer = () => {
	return (
		<footer className='aw-footer text-center'>
            <div className='container px-4 py-5'>
                <ul className='list-group list-group-horizontal d-inline-flex justify-content-center'>
                    <li href='https://www.unam.mx' className='list-group-item d-inline-flex my-2'>
                        <img src='/images/UNAM.png' width='32px' height='32px' className='m-2'/>
                    </li>
                    <li href='https://www.acatlan.unam.mx' className='list-group-item d-inline-flex my-2'>
                        <img src='/images/FES-Acatlan.png' width='128px' height='32px' className='m-2'/>
                    </li>
                    <li href='#' className='list-group-item d-inline-flex align-items-center justify-content-center my-2'>
                        <i className='bi bi-facebook'/>
                    </li>
                    <li href='#' className='list-group-item d-inline-flex align-items-center justify-content-center my-2'>
                        <i className='bi bi-twitter'/>
                    </li>
                    <li href='#' className='list-group-item d-inline-flex align-items-center justify-content-center my-2'>
                        <i className='bi bi-instagram'/>
                    </li>
                </ul>
            </div>
			<p>© 2023 - 2024</p>
		</footer>
	);
}

export default Footer;