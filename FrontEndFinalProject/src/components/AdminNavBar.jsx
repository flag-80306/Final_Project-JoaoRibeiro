import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function AdminNavBar({ manager_name, email }) {
	const [admin, setAdmin] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const { userID } = decodedToken;
			setAdmin({ manager_id: userID });
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
				<div>
					<h1>{manager_name}</h1>
					<h2>{email}</h2>
				</div>
				<Link to='/' onClick={handleLogout} className='profileLink'>
					<button className='button'>Logout</button>
				</Link>
			</nav>
		</>
	);
}

export default AdminNavBar;
