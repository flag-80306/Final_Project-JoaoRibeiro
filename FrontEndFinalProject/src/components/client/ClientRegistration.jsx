import React, { useState } from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
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
				<h1>Client Registration</h1>
				<form onSubmit={handlePostSubmit} className='m20'>
					<div>
						<label className='fsz28'>Email:</label>
						<input className='inputs m10' type='email' value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<div>
						<label className='fsz28'>Password:</label>
						<input className='inputs m10' type='password' value={password} onChange={e => setPassword(e.target.value)} />
					</div>
					<div>
						<label className='fsz28'>First & Last Name:</label>
						<input className='inputs m10' type='text' value={clientName} onChange={e => setClientName(e.target.value)} />
					</div>
					<div>
						<label className='fsz28'>Tin:</label>
						<input className='inputs m10' type='number' value={tin} onChange={e => setTin(e.target.value)} />
					</div>
					<div>
						<label className='fsz28'>City:</label>
						<input className='inputs m10' type='text' value={city} onChange={e => setCity(e.target.value)} />
					</div>
					<div>
						<label className='fsz28'>Country:</label>
						<input className='inputs m10' type='text' value={country} onChange={e => setCountry(e.target.value)} />
					</div>
					<button type='submit' className='button m20'>
						Become a New Member!!!
					</button>
				</form>
			</div>
		</>
	);
}

export default ClientRegistration;
