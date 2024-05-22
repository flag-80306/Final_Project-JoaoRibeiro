import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function NavBar() {
	const [admin, setAdmin] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			// console.log('decodedToken', decodedToken);
			const { userID } = decodedToken;

			setAdmin({ manager_id: userID });
		}
	}, []);
	// console.log('admin', admin);
	const handleLogout = () => {
		localStorage.removeItem('token');
	};
	return (
		<>
			<div className='topHeader'></div>
			<nav className='navBar'>
				<Link href='/' className='headerMenu'>
					<img src='/img/INSIDE.png' alt='Inside Logo' className='headerMenuLogo' id='logoHome' />
				</Link>
				{/* {admin && admin.manager_id ? <h1>{admin.manager_id}</h1> : null} */}
				<Link href='/admin/home' className='profileLink'>
					<button className='button'>Admin's Profile</button>
				</Link>

				<Link to='/' onClick={handleLogout} className='profileLink'>
					<button className='button'>Logout</button>
				</Link>
			</nav>
		</>
	);
}

export default NavBar;
