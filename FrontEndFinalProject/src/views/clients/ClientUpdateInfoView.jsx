import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../../components/client/ClientNavBar.jsx';
import FooterBar from '../../components/client/ClientFooterBar.jsx';

function ClientUpdateInfoView() {
	const [email, setEmail] = useState('');
	const [tin, setTin] = useState('');
	const [clientName, setClientName] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [client, setClient] = useState(null);

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

		if (!client.client_id) {
			console.error('Client ID is undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/clients/${client.client_id}`;

			const response = await fetch(url, options);
			const result = response.json();

			if (response.ok) {
				alert('Client Info updated with success');
			} else {
				console.error('Client Info update failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<NavBar />
			<div className='m20'>
				<h1>Update Client Information</h1>
				<form onSubmit={handleSubmit} className='m20'>
					<div>
						<label className='fsz28' for='email'>
							Email:
						</label>
						<input className='inputs m20' type='email' id='email' value={email} onChange={e => setEmail(e.target.value)}></input>
					</div>
					<div>
						<label className='fsz28' for='tin'>
							Tin:
						</label>
						<input className='inputs m20' type='text' id='tin' value={tin} onChange={e => setTin(e.target.value)}></input>
					</div>
					<div>
						<label className='fsz28' for='clientName'>
							First and Last Name:
						</label>
						<input className='inputs m20' type='text' id='clientName' value={clientName} onChange={e => setClientName(e.target.value)}></input>
					</div>
					<div>
						<label className='fsz28' for='city'>
							City:
						</label>
						<input className='inputs m20' type='text' id='city' value={city} onChange={e => setCity(e.target.value)}></input>
					</div>
					<div>
						<label className='fsz28' for='country'>
							Country:
						</label>
						<input className='inputs m20' type='text' id='country' value={country} onChange={e => setCountry(e.target.value)}></input>
					</div>

					<button type='submit' className='button m20 fsz28'>
						Update Now!
					</button>
				</form>
			</div>
			<FooterBar />
		</>
	);
}

export default ClientUpdateInfoView;
