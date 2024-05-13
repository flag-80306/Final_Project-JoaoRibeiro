import { Link } from 'wouter';

function NavBar() {
	const handleLogout = () => {
		localStorage.removeItem('token');
	};
	return (
		<>
			<div className='topHeader'></div>
			<nav className='navBar'>
				<Link href='/' className='headerMenu'>
					<img src='/img/INSIDE.png' className='headerMenuLogo' id='logoHome' />
				</Link>
				<Link to='/home' className='profileLink'>
					<button className='button'>Client's Profile</button>
				</Link>
				<Link to='/' onClick={handleLogout} className='profileLink'>
					<button className='button'>Logout</button>
				</Link>
			</nav>
		</>
	);
}

export default NavBar;
