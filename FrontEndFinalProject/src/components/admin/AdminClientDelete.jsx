import React from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminClientDelete({ client_id, clients, setClients }) {
	async function handleDeleteSubmit() {
		const adminConfirmed = window.confirm(`Are you sure you want to delete client ${client_id}?`);
		if (!adminConfirmed) {
			return;
		}

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

			if (response.ok) {
				console.log(`Client ${client_id} deleted`);
				alert(`Client ${client_id} deleted`);
				const updatedClients = clients.filter(client => !(client.client_id === client_id));
				setClients(updatedClients);
			} else {
				console.error('Delete failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<div className='bt_space'>
				<button onClick={handleDeleteSubmit} className='button'>
					Delete Client
				</button>
			</div>
		</>
	);
}

export default AdminClientDelete;
