import { useEffect, useState } from 'react';

import bookingsServerCalls from '../services/bookingsServerCalls.js';

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
			<h1>Hello, my name is João</h1>
			{bookings.map(booking => (
				<div key={booking.booking_id}>
					<table>
						<tr>
							<th>Booking ID</th>
							<th>Tour Name</th>
							<th>Client Name</th>
							<th>Final Price</th>
							<th>Booking date</th>
							<th>Guide Name</th>
						</tr>
						<tr>
							<td>{booking.booking_id}</td>
							<td>{booking.tour_name}</td>
							<td>{booking.client_name}</td>
							<td>{booking.final_price}</td>
							<td>{booking.booking_date}</td>
							<td>{booking.guide_name}</td>
						</tr>
					</table>
				</div>
			))}
		</>
	);
}
export default BookingsList;
