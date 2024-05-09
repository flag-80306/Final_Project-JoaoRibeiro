import { useEffect, useState } from 'react';

import bookingsServerCalls from '../services/bookingsServerCalls.js';
import { Link } from 'wouter';

function BookingsList() {
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
			<h1>Bookings List</h1>

			<div>
				<table>
					<tr>
						<th>Booking ID</th>
						<th>Tour Name</th>
						<th>Client Name</th>
						<th>Final Price</th>
						<th>Booking date</th>
						<th>Guide Name</th>
					</tr>
					{bookings.map(booking => (
						<tr key={booking.booking_id}>
							<td>{booking.booking_id}</td>
							<td>{booking.tour_name}</td>
							<td>{booking.client_name}</td>
							<td>{booking.final_price}</td>
							<td>{booking.booking_date}</td>
							<td>{booking.guide_name}</td>
						</tr>
					))}
				</table>
				<Link href={'/home'}>
					<button>Return main page</button>
				</Link>
			</div>
		</>
	);
}
export default BookingsList;
