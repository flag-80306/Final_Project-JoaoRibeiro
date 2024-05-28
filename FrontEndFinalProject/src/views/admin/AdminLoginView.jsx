import AdminLogin from '../../components/admin/AdminLogin';

import { Link } from 'wouter';

function AdminLoginView() {
	return (
		<>
			<h1 className='m20'>Manager Login</h1>
			<img src='/img/INSIDE.png' className='imgLogo' alt='logo Inside Tours' />
			<p>Please identify yourself</p>
			<AdminLogin />
			<div className='m20'>
				<Link href='/'>
					<button className='button m20'>Return to home page</button>
				</Link>
			</div>
		</>
	);
}

export default AdminLoginView;
