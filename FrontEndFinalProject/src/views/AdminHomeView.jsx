import clientServerCalls from '../services/clientServerCalls';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function HomeView() {
	// const [client, setClient] = useState(null);
	// const [clientData, setClientData] = useState(null);

	// useEffect(() => {
	// 	const token = localStorage.getItem('token');
	// 	if (token) {
	// 		const decodedToken = jwtDecode(token);
	// 		const { userID } = decodedToken;

	// 		setClient({ client_id: userID });
	// 	}
	// }, []);

	// // console.log(client);

	// useEffect(() => {
	// 	const fetchClientData = async () => {
	// 		try {
	// 			const data = await clientServerCalls.getClientByID(parseInt(client.client_id));

	// 			setClientData(data);
	// 		} catch (error) {
	// 			console.log('Erro ao obter dados cliente:', error);
	// 		}
	// 	};

	// 	fetchClientData();
	// }, [client]);

	// console.log(clientData);

	return (
		<>
			<div className='mainTitle'>
				<div>
					<h1>Clients List</h1>
					<table>
						<thead>
							<tr>
								<th>Booking ID</th>
								<th>Tour Name</th>
								<th>Client Name</th>
								<th>Qty People</th>
								<th>Final Price</th>
								<th>Booking date</th>
								<th>Guide Name</th>
								<th>Client Bookings</th>
							</tr>
						</thead>
					</table>
				</div>
				<div>
					<h1>Bookings List</h1>
					<table>
						<thead>
							<tr>
								<th>Booking ID</th>
								<th>Tour Name</th>
								<th>Client Name</th>
								<th>Qty People</th>
								<th>Final Price</th>
								<th>Booking date</th>
								<th>Guide Name</th>
								<th>Client Bookings</th>
							</tr>
						</thead>
					</table>
				</div>
				<div>
					<h1>Guides List</h1>
					<table>
						<thead>
							<tr>
								<th>Booking ID</th>
								<th>Tour Name</th>
								<th>Client Name</th>
								<th>Qty People</th>
								<th>Final Price</th>
								<th>Booking date</th>
								<th>Guide Name</th>
								<th>Client Bookings</th>
							</tr>
						</thead>
					</table>
				</div>
				<div>
					<h1>Tours List</h1>
					<table>
						<thead>
							<tr>
								<th>Booking ID</th>
								<th>Tour Name</th>
								<th>Client Name</th>
								<th>Qty People</th>
								<th>Final Price</th>
								<th>Booking date</th>
								<th>Guide Name</th>
								<th>Client Bookings</th>
							</tr>
						</thead>
					</table>
				</div>
				<div>
					<h1>Shopping Cart List</h1>
					<table>
						<thead>
							<tr>
								<th>Booking ID</th>
								<th>Tour Name</th>
								<th>Client Name</th>
								<th>Qty People</th>
								<th>Final Price</th>
								<th>Booking date</th>
								<th>Guide Name</th>
								<th>Client Bookings</th>
							</tr>
						</thead>
					</table>
				</div>
				<div>
					<h1>admins List</h1>
					<table>
						<thead>
							<tr>
								<th>Booking ID</th>
								<th>Tour Name</th>
								<th>Client Name</th>
								<th>Qty People</th>
								<th>Final Price</th>
								<th>Booking date</th>
								<th>Guide Name</th>
								<th>Client Bookings</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</>
	);
}

export default HomeView;
