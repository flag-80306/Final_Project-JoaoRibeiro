import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import clientServerCalls from '../services/clientServerCalls.js';
import NavBar from '../components/NavBar.jsx';
import FooterBar from '../components/FooterBar.jsx';
import { jwtDecode } from 'jwt-decode';

function ClientInfoView() {
	const [client, setClient] = useState(null);
	const [clientInfo, setClientInfo] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const { userID } = decodedToken;
			console.log('decodedToken', decodedToken);
			setClient({ client_id: userID });
		}
	}, []);

	console.log('client', client);

	useEffect(() => {
		const fetchClientInfo = async () => {
			try {
				const data = await clientServerCalls.getClientByID(parseInt(client.client_id));
				console.log('data', data);
				setClientInfo(data);
			} catch (error) {
				console.log('Erro ao obter dados cliente:', error);
			}
		};

		fetchClientInfo();
	}, [client]);
	console.log('clientInfo', clientInfo);
	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				{clientInfo ? <h1>Hello {clientInfo.client_name} </h1> : <h1>Loading...</h1>}

				<div>
					<table>
						<thead>
							<tr>
								<th>Client Name</th>
								<th>Email</th>
								<th>Password</th>
								<th>Tin</th>
								<th>City</th>
								<th>Country</th>
								<th>Client Number</th>
								<th>Reservations</th>
							</tr>
						</thead>
						{clientInfo ? (
							<tbody>
								<tr>
									<td>{clientInfo.client_name}</td>
									<td>{clientInfo.email}</td>
									<td>
										<Link href={`/client/newpassword/${client.client_id}`}>
											<button className='button'>Edit Password</button>
										</Link>
									</td>
									<td>{clientInfo.tin}</td>
									<td>{clientInfo.city}</td>
									<td>{clientInfo.country}</td>
									<td>{clientInfo.client_id}</td>
									<td>
										<Link href={`/client/updateInfo/${client.client_id}`}>
											<button className='button'>Edit Info</button>
										</Link>
									</td>
								</tr>
							</tbody>
						) : (
							<h1>Loading...</h1>
						)}
					</table>
					<div className='bt_space'>
						{clientInfo ? (
							<Link href={`/bookings/client/${clientInfo.client_id}`}>
								<button className='button'>See my bookings</button>
							</Link>
						) : (
							<p>Loading...</p>
						)}
						<Link href={'/home'}>
							<button className='button'>Return main page</button>
						</Link>
					</div>
				</div>
			</div>

			<FooterBar />
		</>
	);
}

export default ClientInfoView;
