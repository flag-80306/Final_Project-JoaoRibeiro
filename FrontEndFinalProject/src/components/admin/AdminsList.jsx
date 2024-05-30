import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import adminsServerCalls from '../../services/adminsServerCalls.js';
import AdminDelete from './AdminDelete.jsx';
import AdminRegistration from './AdminRegistration.jsx';
import { jwtDecode } from 'jwt-decode';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-admin');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}

function toggleAddAdmin() {
	const containerAddAdmin = document.getElementById('containerAddAdmin');
	if (containerAddAdmin.classList.contains('hidden')) {
		containerAddAdmin.classList.remove('hidden');
	} else {
		containerAddAdmin.classList.add('hidden');
	}
}

function AdminsList() {
	const [admins, setAdmins] = useState([]);
	const [logManager, setLogManager] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const { userID } = decodedToken;

			setLogManager({ logManager_id: userID });
		}
	}, []);

	useEffect(() => {
		async function fetchAllAdmins() {
			const results = await adminsServerCalls.getAllAdmins();
			setAdmins(results);
		}
		fetchAllAdmins();
	}, []);

	return (
		<>
			<div className='mainTitle'>
				<h1>
					Admins List&nbsp;&nbsp;
					<button onClick={toggleTable} className='button'>
						Show/Hide Table
					</button>
				</h1>
				<div id='table-container-admin' className='hidden'>
					<table className='table'>
						<thead>
							<tr>
								<th>Manager Info</th>
								<th>Edit</th>
							</tr>
						</thead>
						<tbody>
							{admins.map(admin => (
								<tr key={admin.manager_id}>
									<td>
										{admin.manager_id} - {admin.manager_name}
										<br />
										{admin.email}
									</td>
									<td>
										{logManager.logManager_id === 1 && (
											<Link href={`/admin/admin/${admin.manager_id}`}>
												<button className='button'>Edit</button>
											</Link>
										)}
										<AdminDelete manager_id={admin.manager_id} admins={admins} setAdmins={setAdmins} />
									</td>
								</tr>
							))}
							<tr>
								<td colSpan='2'>
									<button className='button_yellow' onClick={toggleAddAdmin}>
										Add New Manager
									</button>
									<div id='containerAddAdmin' className='hidden'>
										<AdminRegistration setAdmins={setAdmins} />
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
export default AdminsList;
