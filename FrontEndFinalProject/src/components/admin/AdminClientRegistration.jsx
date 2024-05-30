import React, { useState } from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminClientRegistration({ setClients }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [tin, setTin] = useState('');
	const [clientName, setClientName] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');

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
			if (response.ok) {
				const result = await response.json();

				alert(`Registration successful!! New Client!!!`);

				setClients(prevClients => [...prevClients, result]);
			} else {
				console.error('Registration failed:', result.message);
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
					<button type='submit' className='button_yellow'>
						Make registration
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminClientRegistration;
