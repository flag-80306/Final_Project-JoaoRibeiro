import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
import AdminNavBar from '../../components/AdminNavBar.jsx';
import AdminFooterBar from '../../components/AdminFooterBar.jsx';
// import clientsServerCalls from '../services/clientsServerCalls.js';

function AdminUpdateClientInfoView() {
	const [match, params] = useRoute('/admin/client/:client_id');
	const client_id = params ? params.client_id : null;
	const [clientName, setClientName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [tin, setTin] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			client_name: clientName,
			email,
			password,
			tin,
			city,
			country,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		if (!client_id) {
			console.error('Client ID is undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/clients/${client_id}`;

			const response = await fetch(url, options);
			const result = await response.json();

			if (response.ok) {
				alert('Client Info updated with success');
				console.log('Client Info updated with success', options.body);
			} else {
				console.error('Client Info update failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<AdminNavBar />
			<div>
				<h2>Update Client Information</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='clientName'>First and Last Name:</label>
						<input type='text' id='clientName' value={clientName} onChange={e => setClientName(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='email'>Email:</label>
						<input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='tin'>Password:</label>
						<input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='tin'>Tin:</label>
						<input type='text' id='tin' value={tin} onChange={e => setTin(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='city'>City:</label>
						<input type='text' id='city' value={city} onChange={e => setCity(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='country'>Country:</label>
						<input type='text' id='country' value={country} onChange={e => setCountry(e.target.value)}></input>
					</div>

					<button type='submit' className='button'>
						Update Now!
					</button>
				</form>
				<div className='bt_space'>
					<Link href={'/admin/home'}>
						<button className='button'>Return main page</button>
					</Link>
				</div>
			</div>
			<AdminFooterBar />
		</>
	);
}

export default AdminUpdateClientInfoView;
