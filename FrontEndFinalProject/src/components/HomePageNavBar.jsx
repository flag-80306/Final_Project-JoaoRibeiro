import { Link } from 'wouter';
function HomePageNavBar() {
	return (
		<>
			<div className='topHeader'></div>
			<nav className='navBar'>
				<Link href='/admin/login' className='headerMenu'>
					<img src='/img/INSIDE.png' alt='Inside Logo' className='headerMenuLogo' id='logoHome' />
				</Link>
			</nav>
		</>
	);
}

export default HomePageNavBar;
