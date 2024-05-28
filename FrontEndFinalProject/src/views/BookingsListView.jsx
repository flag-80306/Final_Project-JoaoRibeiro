import { useEffect, useState } from 'react';
import bookingsServerCalls from '../services/bookingsServerCalls.js';
import { Link } from 'wouter';
import NavBar from '../components/client/ClientNavBar.jsx';
import FooterBar from '../components/client/ClientFooterBar.jsx';

function BookingsListView() {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		async function fetchALLBookings() {
			const results = await bookingsServerCalls.getAllBookings();
			console.log(results);
			setBookings(results);
		}
		fetchALLBookings();
	}, []);

	return (
		<>
			<NavBar />
			<div className='mainTitle'>
				<h1>Bookings List</h1>

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
							{bookings.map(booking => (
								<tr key={booking.booking_id}>
									<td>{booking.booking_id}</td>
									<td>{booking.tour_name}</td>
									<td>{booking.client_name}</td>
									<td>{booking.final_price}</td>
									<td>{booking.booking_date}</td>
									<td>{booking.guide_name}</td>
									<td>
										<Link href={`/bookings/client/${booking.client_id}`}>
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
export default BookingsListView;
