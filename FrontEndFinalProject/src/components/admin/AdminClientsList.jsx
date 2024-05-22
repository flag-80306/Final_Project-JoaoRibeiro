import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import clientsServerCalls from '../../services/clientsServerCalls.js';
import AdminClientRegistration from './AdminClientRegistration.jsx';
import AdminClientDelete from './AdminClientDelete.jsx';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-clients');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}
function toggleAddClient() {
	const containerAddClient = document.getElementById('containerAddClient');
	if (containerAddClient.classList.contains('hidden')) {
		containerAddClient.classList.remove('hidden');
	} else {
		containerAddClient.classList.add('hidden');
	}
}

function AdminClientsList() {
	const [clients, setClients] = useState([]);

	useEffect(() => {
		async function fetchAllClients() {
			const results = await clientsServerCalls.getAllClients();
			setClients(results);
		}
		fetchAllClients();
	}, []);

	return (
		<>
			<div className='mainTitle'>
				<h1>
					Clients List&nbsp;&nbsp;
					<button onClick={toggleTable} className='button'>
						Show/Hide Table
					</button>
				</h1>
				<div id='table-container-clients' className='hidden'>
					<table className='table'>
						<thead>
							<tr>
								<th>Client ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Tin</th>
								<th>City</th>
								<th>Country</th>
								<th>Edit Client Info </th>
							</tr>
						</thead>
						<tbody>
							{clients.map(client => (
								<tr key={client.client_id}>
									<td>{client.client_id}</td>
									<td>{client.client_name}</td>
									<td>{client.email}</td>
									<td>{client.tin}</td>
									<td>{client.city}</td>
									<td>{client.country}</td>
									<td>
										<Link href={`/admin/client/${client.client_id}`}>
											<button className='button'>Edit</button>
										</Link>
										<AdminClientDelete client_id={client.client_id} />
									</td>
								</tr>
							))}
						</tbody>

						<button className='button' onClick={toggleAddClient}>
							Add New Client
						</button>
						<div id='containerAddClient' className='hidden'>
							<AdminClientRegistration />
						</div>
					</table>
				</div>
			</div>
		</>
	);
}
export default AdminClientsList;
