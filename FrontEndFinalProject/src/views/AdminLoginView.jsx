import AdminLogin from '../components/AdminLogin';

import { Link } from 'wouter';

function AdminLoginView() {
	return (
		<>
			<h1>HELLO MASTER</h1>
			<img src='/img/INSIDE.png' className='imgLogo' alt='logo Inside Tours' />
			<p>Please identify yourself</p>
			<AdminLogin />
		</>
	);
}

export default AdminLoginView;
