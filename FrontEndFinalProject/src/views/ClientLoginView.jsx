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
				<Link href={'/home'}>
					<label htmlFor='username'>Email: </label>
					<input type='text' id='username' />
					<br />
					<label htmlFor='password'>Password: </label>
					<input type='text' id='password' />
					<button className='button'>Log In</button>
				</Link>
				<br />
				<br />
				<Link href={'/home'}>
					<h3>Don't have an account?</h3>
					{/* criar pagina para adicionar novo utilizador */}
					<button className='button linkSignUp'>Sign Up</button>
				</Link>
			</div>
		</>
	);
}

export default ClientLoginView;
