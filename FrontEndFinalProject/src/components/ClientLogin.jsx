import React, { useState } from 'react';

function ClientLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigateToPage = () => {
		window.location.href = '/home';
	};
	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			email: email,
			password: password,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = 'http://localhost:3000/clients/login';
			const response = await fetch(url, options);
			const result = await response.json();
			localStorage.setItem('token', result.token);

			if (response.ok) {
				console.log('Login successful');
			} else {
				console.error('Login failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		navigateToPage();
	}

	return (
		<div>
			<h2>Client Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input type='email' value={email} onChange={e => setEmail(e.target.value)} />
				</div>
				<div>
					<label>Password:</label>
					<input type='password' value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				<button type='submit' className='button'>
					Login
				</button>
			</form>
		</div>
	);
}

export default ClientLogin;
