import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import bookingsServerCalls from '../../services/bookingsServerCalls.js';
import NavBar from '../../components/client/ClientNavBar.jsx';
import FooterBar from '../../components/client/ClientFooterBar.jsx';
import { jwtDecode } from 'jwt-decode';
import ClientBookingDelete from '../../components/client/ClientBookingDelete.jsx';
import ClientRateRegistration from './ClientRateRegistration.jsx';

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
		if (!client) return;
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

	const currentDate = new Date().toISOString().slice(0, 10);

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
							{clientBookings?.map(clientBooking => {
								const bookingDate = new Date(clientBooking.booking_date)?.toISOString().slice(0, 10);
								return (
									<tr key={clientBooking.booking_id}>
										<td>
											<b>
												{clientBooking.booking_id} - {clientBooking.tour_name}
											</b>
											<br />
											<br />
											<b>Guide Name:</b>
											{clientBooking.guide_name}
										</td>
										<td>
											<b>{clientBooking.client_name} </b>
										</td>
										<td>
											<b>Group Size: </b> {clientBooking.people} pax
											<br />
											<br />
											<b>Final Price:</b> {clientBooking.final_price}
										</td>
										<td>
											{bookingDate > currentDate && <b>{bookingDate}</b>}
											{bookingDate === currentDate && (
												<>
													<b>The tour is today!</b>
												</>
											)}
											{bookingDate < currentDate && (
												<>
													<b>{bookingDate}</b>
													<br />
													<br />
													<b>Rate:</b> {clientBooking.rate}
												</>
											)}
										</td>
										{bookingDate > currentDate && (
											<td>
												<Link href={`/client/booking/${clientBooking.booking_id}`}>
													<button className='button'>Edit</button>
												</Link>
												<ClientBookingDelete booking_id={clientBooking.booking_id} clientBookings={clientBookings} setClientBookings={setClientBookings} />
											</td>
										)}

										{bookingDate < currentDate && (
											<td>
												<ClientRateRegistration booking_id={clientBooking.booking_id} tour_id={clientBooking.tour_id} rating={clientBooking.rate} />
											</td>
										)}
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className='bt_space'>
						{client ? (
							<Link href={`/client/favourite-tour/${client.client_id}`}>
								<button className='button m20 fsz28'>See here your Favourite Tours</button>
							</Link>
						) : (
							<p>Loading...</p>
						)}
					</div>
				</div>
			</div>

			<FooterBar />
		</>
	);
}
export default ClientBookingDetailsView;
