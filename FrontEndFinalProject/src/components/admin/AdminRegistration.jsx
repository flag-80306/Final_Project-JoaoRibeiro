import React, { useState } from 'react';
import { Link } from 'wouter';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminRegistration({ setAdmins }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [managerName, setManagerName] = useState('');

	async function handlePostSubmit(event) {
		event.preventDefault();
		console.log(event);
		const body = {
			email,
			password,
			manager_name: managerName,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/admin/register`;
			const response = await fetch(url, options);
			// console.log('response', response);
			const result = await response.json();
			if (response.ok) {
				console.log('Registration successful', result);
				alert('New manager created!');

				setAdmins(prevAdmins => [...prevAdmins, result]);
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
				<h2 className='m10'>Booking Registration</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Manager Name:</label>
						<input className='inputs m10' type='text' value={managerName} onChange={e => setManagerName(e.target.value)} />
					</div>
					<div>
						<label>Email:</label>
						<input className='inputs m10' type='email' value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<div>
						<label>Password:</label>
						<input className='inputs m10' type='password' value={password} onChange={e => setPassword(e.target.value)} />
					</div>

					<button type='submit' className='button_yellow'>
						Make Manager Registration
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminRegistration;
