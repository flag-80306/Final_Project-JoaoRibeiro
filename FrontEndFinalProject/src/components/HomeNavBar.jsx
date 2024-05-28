import { Link } from 'wouter';
function HomeNavBar() {
	return (
		<>
			<div className='topHeader'></div>
			<nav className='navBar'>
				<Link href='/admin/login' className='headerMenu'>
					<img src='/img/INSIDE.png' alt='Inside Logo' className='headerMenuLogo' />
				</Link>

				<Link href='/client/login'>
					<button className='button m20'>Client Login</button>
				</Link>
			</nav>
		</>
	);
}

export default HomeNavBar;
