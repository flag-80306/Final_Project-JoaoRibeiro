import { Link } from 'wouter'; // npm i wouter

function NavBar() {
	return (
		<>
			<div className='topHeader'></div>
			<nav className='navBar'>
				<Link href='/' className='headerMenu'>
					<img src='/img/INSIDE.png' className='headerMenuLogo' id='logoHome' />
				</Link>

				<Link href='/home' className='profileLink'>
					<h3>See your Profile</h3>
				</Link>
			</nav>
		</>
	);
}

export default NavBar;
