import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';
function ClientRegistration() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [tin, setTin] = useState('');
	const [clientName, setClientName] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');

	const navigateToLoginPage = () => {
		window.location.href = '/client/login';
	};
	async function handlePostSubmit(event) {
		event.preventDefault();

		const body = {
			email,
			password,
			client_name: clientName,
			tin,
			city,
			country,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/clients/register`;
			const response = await fetch(url, options);
			const result = await response.json();

			if (response.ok) {
				alert('New Client! Welcome!');
				console.log('Registration successful');
				navigateToLoginPage();
			} else {
				if (response.status === 500) {
					alert('Email already exists in database!');
					console.error('Email already exists:', result.message);
				} else {
					console.error('Registration failed:', result.message);
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<div>
				<h2>Client Registration</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Email:</label>
						<input type='email' value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<div>
						<label>Password:</label>
						<input type='password' value={password} onChange={e => setPassword(e.target.value)} />
					</div>
					<div>
						<label>First & Last Name:</label>
						<input type='text' value={clientName} onChange={e => setClientName(e.target.value)} />
					</div>
					<div>
						<label>Tin:</label>
						<input type='number' value={tin} onChange={e => setTin(e.target.value)} />
					</div>
					<div>
						<label>City:</label>
						<input type='text' value={city} onChange={e => setCity(e.target.value)} />
					</div>
					<div>
						<label>Country:</label>
						<input type='text' value={country} onChange={e => setCountry(e.target.value)} />
					</div>
					<button type='submit' className='button'>
						Make Client Registration
					</button>
				</form>
			</div>
		</>
	);
}

export default ClientRegistration;
