import React, { useState, useEffect } from 'react';
const baseDomain = 'http://localhost:3000';
import { jwtDecode } from 'jwt-decode';
import clientServerCalls from '../../services/clientsServerCalls.js';
import NavBar from '../../components/NavBar.jsx';
import FooterBar from '../../components/FooterBar.jsx';

function ClientUpdateInfoView() {
	const [email, setEmail] = useState('');
	const [tin, setTin] = useState('');
	const [clientName, setClientName] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [client, setClient] = useState(null);
	const [clientInfo, setClientInfo] = useState(null);

	// const navigateToLoginPage = () => {
	// 	window.location.href = '/client/login';
	// };
	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			email,
			tin,
			client_name: clientName,
			city,
			country,
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

		// console.log('client.client_id', client.client_id);

		if (!client.client_id) {
			console.error('Client ID is undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/clients/${client.client_id}`;
			// console.log('options', options.body);
			// console.log('url', url);
			const response = await fetch(url, options);
			const result = response.json();

			if (response.ok) {
				alert('Client Info updated with success');
				console.log('Client Info updated with success', options.body);
			} else {
				console.error('Client Info update failed:', result.message);
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
				<h2>Update Client Information</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label for='email'>Email:</label>
						<input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)}></input>
					</div>
					<div>
						<label for='tin'>Tin:</label>
						<input type='text' id='tin' value={tin} onChange={e => setTin(e.target.value)}></input>
					</div>
					<div>
						<label for='clientName'>First and Last Name:</label>
						<input type='text' id='clientName' value={clientName} onChange={e => setClientName(e.target.value)}></input>
					</div>
					<div>
						<label for='city'>City:</label>
						<input type='text' id='city' value={city} onChange={e => setCity(e.target.value)}></input>
					</div>
					<div>
						<label for='country'>Country:</label>
						<input type='text' id='country' value={country} onChange={e => setCountry(e.target.value)}></input>
					</div>

					<button type='submit' className='button'>
						Update Now!
					</button>
				</form>
			</div>
			<FooterBar />
		</>
	);
}

export default ClientUpdateInfoView;
