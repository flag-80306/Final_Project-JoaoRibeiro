import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import bookingsServerCalls from '../../services/bookingsServerCalls.js';
import NavBar from '../../components/NavBar.jsx';
import FooterBar from '../../components/FooterBar.jsx';
import { jwtDecode } from 'jwt-decode';
import ClientBookingDelete from '../../components/client/ClientBookingDelete.jsx';

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
				} catch (error) {
					console.error('Erro ao obter dados cliente:', error);
				}
			}
		};

		fetchClientData();
	}, [client]);
	console.log('client', client);
	console.log('clientBookings', clientBookings);
	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				{clientBookings && clientBookings.length > 0 && <h1>Bookings List from {clientBookings[0].client_name}</h1>}
				<div>
					<table>
						<thead>
							<tr>
								<th>Booking</th>
								<th>Client Name</th>
								<th>Details</th>
								<th>Booking date</th>
								<th>Client Bookings</th>
							</tr>
						</thead>
						<tbody>
							{clientBookings?.map(clientBooking => (
								<tr key={clientBooking.booking_id}>
									<td>
										<b>
											{clientBooking.booking_id} - {clientBooking.tour_name}{' '}
										</b>
										<br />
										<br />
										<b>Guide Name:</b>
										{clientBooking.guide_name}
									</td>
									<td>
										{' '}
										<b>{clientBooking.client_name} </b>
									</td>
									<td>
										<b>Group Size: </b> {clientBooking.people} pax
										<br />
										<br />
										<b>Final Price:</b> {clientBooking.final_price}
									</td>
									<td>
										<b>{new Date(clientBooking.booking_date)?.toISOString().slice(0, 10)}</b>
									</td>

									<td>
										<Link href={`/client/booking/${clientBooking.booking_id}`}>
											<button className='button'>Edit</button>
										</Link>
										<ClientBookingDelete booking_id={clientBooking.booking_id} clientBookings={clientBookings} setClientBookings={setClientBookings} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className='bt_space'>
						<Link href='/clients/shopingcart'>
							<button className='button'>See your Favourite Tours</button>
						</Link>
					</div>
				</div>
			</div>

			<FooterBar />
		</>
	);
}
export default ClientBookingDetailsView;
