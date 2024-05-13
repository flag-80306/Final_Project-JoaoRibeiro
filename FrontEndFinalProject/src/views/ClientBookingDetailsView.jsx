import { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import bookingsServerCalls from '../services/bookingsServerCalls.js';
import NavBar from '../components/NavBar.jsx';
import FooterBar from '../components/FooterBar.jsx';

function ClientBookingDetailsView() {
	const [match, params] = useRoute('/bookings/client/:client_id');
	const client_id = params ? params.client_id : null;
	const [clientBooking, setClientBooking] = useState(null);

	useEffect(() => {
		if (client_id) {
			async function fetchClientBooking() {
				const response = await bookingsServerCalls.getClientBookingByID(client_id);
				const result = response;
				console.log(result);
				setClientBooking(result);
			}
			fetchClientBooking();
		}
	}, [client_id]);

	if (!clientBooking) {
		return <h3>Loading...</h3>;
	}

	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				<h1>Bookings List from {clientBooking[0].client_name} </h1>

				<div>
					<table>
						<thead>
							<tr>
								<th>Booking ID</th>
								<th>Tour Name</th>
								<th>Client Name</th>
								<th>Final Price</th>
								<th>Booking date</th>
								<th>Guide Name</th>
								<th>Client Bookings</th>
							</tr>
						</thead>
						<tbody>
							{clientBooking.map(clientBooking => (
								<tr key={clientBooking.booking_id}>
									<td>{clientBooking.booking_id}</td>
									<td>{clientBooking.tour_name}</td>
									<td>{clientBooking.client_name}</td>
									<td>{clientBooking.final_price}</td>
									<td>{clientBooking.booking_date}</td>
									<td>{clientBooking.guide_name}</td>
									<td>
										<Link href={`/bookings/client/${clientBooking.client_id}`}>
											<button className='button'>Click here for + info</button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
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
