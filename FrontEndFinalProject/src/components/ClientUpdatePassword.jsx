import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';

function ClientUpdatePassword() {
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [verifyNewPassword, setVerifyNewPassword] = useState('');

	// const navigateToLoginPage = () => {
	// 	window.location.href = '/client/login';
	// };
	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			password,
			newPassword,
			verifyNewPassword,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/clients/updatePassword/${client_id}`;
			const response = await fetch(url, options);
			const result = await response.json();

			console.log(result);

			if (response.ok) {
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
		<div>
			<h2>Update Login Password</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Password:</label>
					<input type='password' value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				<div>
					<label>New Password:</label>
					<input type='password' value={password} onChange={e => setNewPassword(e.target.value)} />
				</div>
				<div>
					<label>New Password:</label>
					<input type='password' value={password} onChange={e => setVerifyNewPassword(e.target.value)} />
				</div>

				<button type='submit' className='button'>
					Change Password
				</button>
			</form>
		</div>
	);
}

export default ClientUpdatePassword;
