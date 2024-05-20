import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';
function AdminClientDelete({ client_id }) {
	// const [clientID, setClientID] = useState('');

	const navigateToLoginPage = () => {
		window.location.href = '/admin/home';
	};
	async function handleDeleteSubmit() {
		// event.preventDefault();

		// const body = {
		// 	email: email,
		// 	password: password,
		// 	client_name: clientName,
		// 	tin: tin,
		// 	city: city,
		// 	country: country,
		// };

		const options = {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/clients/${client_id}`;
			const response = await fetch(url, options);
			const result = await response.json();

			console.log(result);

			if (response.ok) {
				alert(`Client ${client_id} deleted`);
				console.log(`Client ${client_id} deleted`);
			} else {
				console.error('Delete failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		navigateToLoginPage();
	}

	return (
		<>
			<div>
				<button onClick={handleDeleteSubmit} className='button'>
					Delete Client
				</button>
			</div>
		</>
	);
}

export default AdminClientDelete;
