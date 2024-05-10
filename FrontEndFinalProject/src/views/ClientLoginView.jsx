import { Link } from 'wouter';

function ClientLoginView() {
	return (
		<>
			<div>
				<h1>Welcome to Inside Experiences</h1>
				<img src='/img/INSIDE.png' className='imgLogo' alt='logo Inside Tours' />
				<p>Please identify yourself</p>
				<Link href={'/home'}>
					<label htmlFor='username'>Email: </label>
					<input type='text' id='username' />
					<br />
					<label htmlFor='password'>Password: </label>
					<input type='text' id='password' />
					<button>Log In</button>
				</Link>
				<br />
				<br />
				<Link href={'/home'}>
					{/* criar pagina para adicionar novo utilizador */}
					<button>Sign Up</button>
				</Link>
			</div>
		</>
	);
}

export default ClientLoginView;
