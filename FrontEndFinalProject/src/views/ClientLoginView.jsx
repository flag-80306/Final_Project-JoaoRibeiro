import ClientLogin from '../components/ClientLogin';

import { Link } from 'wouter';

function ClientLoginView() {
	return (
		<>
			<div className='bodyBackground'>
				<img src='../img/toursList.png' alt='image of all the tours' style={{ maxWidth: '100%' }} className='imgHome' />
			</div>
			<div className='mainTitleLogin'>
				<h1>WELCOME TO</h1>
				<img src='/img/INSIDE.png' className='imgLogo' alt='logo Inside Tours' />
				<p>Please identify yourself</p>
				<ClientLogin />
				<br />
				<br />
				<h3>Don't have an account?</h3>
				<Link to='/client/registration'>
					<button className='button'>Sign Up</button>
				</Link>
			</div>
		</>
	);
}

export default ClientLoginView;
