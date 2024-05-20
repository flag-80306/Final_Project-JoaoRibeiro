import React, { useState } from 'react';

function AdminBookingRegistration() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [tin, setTin] = useState('');
	const [clientName, setClientName] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');

	const navigateToLoginPage = () => {
		window.location.href = '/admin/home';
	};
	async function handlePostSubmit(event) {
		event.preventDefault();

		const body = {
			email: email,
			password: password,
			client_name: clientName,
			tin: tin,
			city: city,
			country: country,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = 'http://localhost:3000/clients/register';
			const response = await fetch(url, options);
			const result = await response.json();

			console.log(result);

			if (response.ok) {
				console.log('Registration successful');
			} else {
				console.error('Registration failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		navigateToLoginPage();
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
						Make registration
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminBookingRegistration;
