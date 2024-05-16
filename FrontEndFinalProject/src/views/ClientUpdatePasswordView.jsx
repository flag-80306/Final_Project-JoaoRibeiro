import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';
import { jwtDecode } from 'jwt-decode';

import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';

function ClientUpdatePasswordView() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [verifyNewPassword, setVerifyNewPassword] = useState('');
	const [client, setClient] = useState(null);

	// const navigateToLoginPage = () => {
	// 	window.location.href = '/client/login';
	// };
	async function handleSubmit(event) {
		event.preventDefault();

		if (newPassword !== verifyNewPassword) {
			console.error('New passwords do not match');
			return;
		}

		const body = {
			currentPassword,
			newPassword,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const { userID } = decodedToken;

			setClient({ client_id: userID });
		}

		// console.log('client', client);

		// console.log('user', client.userID);

		if (!client.client_id) {
			console.error('Client ID is undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/clients/updatePassword/${client.client_id}`;
			console.log('options', options);
			console.log('url', url);
			const response = await fetch(url, options);
			const result = await response.json();

			console.log(result);

			if (response.ok) {
				alert('Password updated with success');
				console.log('Password updated with success');
			} else {
				console.error('Password update failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		// navigateToLoginPage();
	}

	return (
		<>
			<NavBar />
			<div>
				<h2>Update Login Password</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Password:</label>
						<input type='password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
					</div>
					<div>
						<label>New Password:</label>
						<input type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
					</div>
					<div>
						<label>Repet New Password:</label>
						<input type='password' value={verifyNewPassword} onChange={e => setVerifyNewPassword(e.target.value)} />
					</div>

					<button type='submit' className='button'>
						Change Password
					</button>
				</form>
			</div>
			<FooterBar />
		</>
	);
}

export default ClientUpdatePasswordView;
