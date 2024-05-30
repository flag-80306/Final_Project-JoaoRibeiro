import React, { useState } from 'react';

function ClientLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigateToClientLogin = () => {
		window.location.href = '/client/login';
	};
	const navigateToPage = () => {
		window.location.href = '/home';
	};
	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			email,
			password,
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
				alert('Login successful!!!');
				navigateToPage();
			} else {
				alert(`Almost there!!! ${result.message}`);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<div>
			<h1>Client Login</h1>
			<form onSubmit={handleSubmit} className='m20'>
				<div>
					<label className='fsz28'>Email:</label>
					<input className='inputs m20' type='email' value={email} onChange={e => setEmail(e.target.value)} />
				</div>
				<div>
					<label className='fsz28'>Password:</label>
					<input className='inputs m20' type='password' value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				<button type='submit' className='button'>
					Login
				</button>
			</form>
		</div>
	);
}

export default ClientLogin;
