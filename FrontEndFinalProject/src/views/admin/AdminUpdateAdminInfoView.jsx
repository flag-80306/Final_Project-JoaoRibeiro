import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
import AdminNavBar from '../../components/AdminNavBar.jsx';
import AdminFooterBar from '../../components/AdminFooterBar.jsx';

function AdminUpdateAdminInfoView() {
	const [match, params] = useRoute('/admin/admin/:manager_id');
	const manager_id = params ? params.manager_id : null;
	const [managerName, setManagerName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			manager_name: managerName,
			email,
			password,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		if (!manager_id) {
			console.error('Manager ID is undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/admin/${manager_id}`;

			const response = await fetch(url, options);
			const result = await response.json();

			if (response.ok) {
				alert('Manager Info updated with success');
			} else {
				console.error('Manager Info update failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<AdminNavBar />
			<div className='m20'>
				<h1>Update Manager Information</h1>
				<form onSubmit={handleSubmit} className='m20'>
					<div>
						<label htmlFor='managerName' className='fsz28'>
							Manager Name:
						</label>
						<input className='inputs m20' type='text' id='managerName' value={managerName} onChange={e => setManagerName(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='email' className='fsz28'>
							Email:
						</label>
						<input className='inputs m20' type='text' id='email' value={email} onChange={e => setEmail(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='password' className='fsz28'>
							Password:
						</label>
						<input className='inputs m20' type='text' id='password' value={password} onChange={e => setPassword(e.target.value)}></input>
					</div>

					<button type='submit' className='button m20'>
						Update Now!
					</button>
				</form>
				<div className='bt_space'>
					<Link href={'/admin/home'}>
						<button className='button m20'>Return main page</button>
					</Link>
				</div>
			</div>
			<AdminFooterBar />
		</>
	);
}

export default AdminUpdateAdminInfoView;
