import AdminLogin from '../../components/admin/AdminLogin';

import { Link } from 'wouter';

function AdminLoginView() {
	return (
		<>
			<h1>HELLO MASTER</h1>
			<img src='/img/INSIDE.png' className='imgLogo' alt='logo Inside Tours' />
			<p>Please identify yourself</p>
			<AdminLogin />
			<div className='m20'>
				<Link href='/'>
					<button className='button'>Return to home page</button>
				</Link>
			</div>
		</>
	);
}

export default AdminLoginView;
