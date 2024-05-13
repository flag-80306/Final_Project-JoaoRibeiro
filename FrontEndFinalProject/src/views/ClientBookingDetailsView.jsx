import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import bookingsServerCalls from '../services/bookingsServerCalls.js';
import NavBar from '../components/NavBar.jsx';
import FooterBar from '../components/FooterBar.jsx';
import { jwtDecode } from 'jwt-decode';

function ClientBookingDetailsView() {
	const [client, setClient] = useState(null);
	const [clientBookings, setClientBookings] = useState(null);

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
		const fetchClientData = async () => {
			try {
				const data = await bookingsServerCalls.getClientBookingByID(parseInt(client.client_id));
				console.log('data', data);
				setClientBookings(data);
			} catch (error) {
				console.log('Erro ao obter dados cliente:', error);
			}
		};

		fetchClientData();
	}, [client]);
	console.log('clientBookings', clientBookings);

	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				{clientBookings ? <h1>Bookings List from {clientBookings.client_name} </h1> : <h1>Loading...</h1>}

				<div>
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
						{clientBookings ? (
							<tbody>
								<tr>
									<td>{clientBookings.booking_id}</td>
									<td>{clientBookings.tour_name}</td>
									<td>{clientBookings.client_name}</td>
									<td>{clientBookings.people}</td>
									<td>{clientBookings.final_price}</td>
									<td>{clientBookings.booking_date}</td>
									<td>{clientBookings.guide_name}</td>
									<td>
										<Link href={`/bookings/client/${clientBookings.client_id}`}>
											<button className='button'>Click here for + info</button>
										</Link>
									</td>
								</tr>
							</tbody>
						) : (
							<h1>Loading...</h1>
						)}
					</table>
					<Link href={'/home'}>
						<button className='button'>Return main page</button>
					</Link>
				</div>
			</div>

			<FooterBar />
		</>
	);
}
export default ClientBookingDetailsView;
