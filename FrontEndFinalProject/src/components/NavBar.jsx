import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function NavBar() {
	const [client, setClient] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const { userID } = decodedToken;

			setClient({ client_id: userID });
		}
	}, []);

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
				{client && client.client_id ? (
					<Link to={`/client/${client.client_id}`} className='profileLink'>
						<button className='button'>Client's Profile</button>
					</Link>
				) : null}
				<Link to='/' onClick={handleLogout} className='profileLink'>
					<button className='button'>Logout</button>
				</Link>
			</nav>
		</>
	);
}

export default NavBar;
