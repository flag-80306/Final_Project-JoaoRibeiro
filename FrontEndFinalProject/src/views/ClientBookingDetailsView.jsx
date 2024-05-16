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
			try {
				const decodedToken = jwtDecode(token);
				const { userID } = decodedToken;
				console.log('decodedToken', decodedToken);
				setClient({ client_id: userID });
			} catch (error) {
				console.error('Error decoding token:', error);
			}
		}
	}, []);

	useEffect(() => {
		const fetchClientData = async () => {
			if (client) {
				try {
					console.log('client', client.client_id);
					const data = await bookingsServerCalls.getClientBookingByID(parseInt(client.client_id));
					console.log('data', data);
					setClientBookings(data);
					console.log('clientBookings', clientBookings);
				} catch (error) {
					console.error('Erro ao obter dados cliente:', error);
				}
			}
		};

		fetchClientData();
	}, [client]);
	// console.log('client', client);

	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				{clientBookings ? <h1>Bookings List from {clientBookings.client_name}</h1> : <h1>Loading...</h1>}
				<div>
					{/* <table>
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
						<tbody>
							{clientBookings.map(booking => (
								<tr key={booking.booking_id}>
									<td>{booking.booking_id}</td>
									<td>{booking.tour_name}</td>
									<td>{booking.client_name}</td>
									<td>{booking.people}</td>
									<td>{booking.final_price}</td>
									<td>{booking.booking_date}</td>
									<td>{booking.guide_name}</td>
									<td>
										<Link href={`/bookings/client/${booking.client_id}`} className='button'>
											<button>Click here for + info</button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table> */}
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
