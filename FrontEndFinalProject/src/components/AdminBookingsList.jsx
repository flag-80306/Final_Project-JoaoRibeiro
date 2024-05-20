import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import bookingsServerCalls from '../services/bookingsServerCalls.js';
// const baseDomain = 'http://localhost:3000';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-bookings');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}

function AdminBookingsList() {
	const [Bookings, setBookings] = useState([]);

	useEffect(() => {
		async function fetchAllBookings() {
			const results = await bookingsServerCalls.getAllBookings();
			setBookings(results);
		}
		fetchAllBookings();
	}, []);

	return (
		<>
			<div className='mainTitle'>
				<h1>
					Bookings List&nbsp;&nbsp;
					<button onClick={toggleTable} className='button'>
						Show/Hide Table
					</button>
				</h1>
				<div id='table-container-bookings' className='hidden'>
					<table className='table'>
						<thead>
							<tr>
								<th>Booking ID</th>
								<th>Tour Name</th>
								<th>Client Name</th>
								<th>Client ID</th>
								<th>People</th>
								<th>Final Price</th>
								<th>Booking Date</th>
								<th>Guide Name</th>
								<th>Edit Booking</th>
							</tr>
						</thead>
						<tbody>
							{Bookings?.map(Booking => (
								<tr key={Booking.booking_id}>
									<td>{Booking.booking_id}</td>
									<td>{Booking.tour_name}</td>
									<td>{Booking.client_name}</td>
									<td>{Booking.client_id}</td>
									<td>{Booking.people}</td>
									<td>{Booking.final_price} €</td>
									<td>{Booking.booking_date}</td>
									<td>{Booking.guide_name}</td>
									<td>
										<Link href={`/admin/home`}>
											<button className='button'>Edit</button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
export default AdminBookingsList;
