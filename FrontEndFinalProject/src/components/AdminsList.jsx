import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import adminsServerCalls from '../services/adminsServerCalls.js';
// const baseDomain = 'http://localhost:3000';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-admin');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}

function AdminsList() {
	const [admins, setAdmins] = useState([]);

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
					{/* <div> */}
					<table className='table'>
						<thead>
							<tr>
								<th>Manager ID</th>
								<th>Name</th>
								<th>Email</th>
								{/* <th>Password</th> */}
								<th>Edit</th>
							</tr>
						</thead>
						<tbody>
							{admins.map(admin => (
								<tr key={admin.manager_id}>
									<td>{admin.manager_id}</td>
									<td>{admin.manager_name}</td>
									<td>{admin.email}</td>
									{/* <td>{admin.password}</td> */}
									<td>
										<Link href={`/admin/home`}>
											<button className='button'>Edit</button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
export default AdminsList;
