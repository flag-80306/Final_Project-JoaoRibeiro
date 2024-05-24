import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';

function AdminRegistration() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [managerName, setManagerName] = useState('');
	const [admins, setAdmins] = useState([]);

	async function handlePostSubmit(event) {
		event.preventDefault();

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
			const result = await response.json();
			if (response.ok) {
				console.log('Registration successful', result);
				alert('New manager created!');

				setAdmins(prevAdmins => [...prevAdmins, result]);
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
				<h2>Admin Registration</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Manager Name:</label>
						<input type='text' value={managerName} onChange={e => setManagerName(e.target.value)} />
					</div>
					<div>
						<label>Email:</label>
						<input type='email' value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<div>
						<label>Password:</label>
						<input type='password' value={password} onChange={e => setPassword(e.target.value)} />
					</div>

					<button type='submit' className='button'>
						Register Manager
					</button>
				</form>
			</div>

			<div>
				<h2>Admins List</h2>
				<ul>
					{admins.map(admin => (
						<li key={admin.manager_id}>
							{admin.manager_name} - {admin.email}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default AdminRegistration;
