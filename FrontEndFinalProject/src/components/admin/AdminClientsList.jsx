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
					<button onClick={toggleTable} className='button m20'>
						Show/Hide Table
					</button>
				</h1>
				<div id='table-container-clients' className='hidden'>
					<table className='table '>
						<thead>
							<tr>
								<th>
									Client <br />
									(Id & Name)
								</th>
								<th>Email</th>
								<th>Tin</th>
								<th>From</th>
								<th>Edit Client Info </th>
							</tr>
						</thead>
						<tbody>
							{clients.map(client => (
								<tr key={client.client_id}>
									<td>
										{client.client_id} <br /> {client.client_name}
									</td>

									<td>{client.email}</td>
									<td>{client.tin}</td>
									<td>
										{client.city}, <br />
										{client.country}
									</td>

									<td>
										<Link href={`/admin/client/${client.client_id}`}>
											<button className='button'>Edit</button>
										</Link>
										<AdminClientDelete client_id={client.client_id} clients={clients} setClients={setClients} />
									</td>
								</tr>
							))}
							<tr>
								<td colSpan='5'>
									<button className='button_yellow' onClick={toggleAddClient}>
										Add New Client
									</button>
									<div id='containerAddClient' className='hidden'>
										<AdminClientRegistration setClients={setClients} />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
export default AdminClientsList;
