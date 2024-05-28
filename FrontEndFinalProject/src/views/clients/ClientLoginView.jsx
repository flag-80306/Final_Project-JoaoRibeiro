import ClientLogin from '../../components/client/ClientLogin';

import { Link } from 'wouter';

function ClientLoginView() {
	return (
		<>
			<div className='bodyBackground'>
				<img src='../img/toursList.png' alt='image of all the tours' style={{ maxWidth: '100%' }} className='imgHome' />
			</div>
			<div className='mainTitleLogin'>
				<h1 className='p20'>WELCOME TO</h1>
				<img src='/img/INSIDE.png' className='imgLogo' alt='logo Inside Tours' />

				<ClientLogin />

				<h2>Don't have an account?</h2>
				<Link to='/client/registration'>
					<button className='button'>Sign Up</button>
				</Link>
			</div>
			<div className='m20'>
				<Link href='/'>
					<button className='button'>Return to home page</button>
				</Link>
			</div>
		</>
	);
}

export default ClientLoginView;
