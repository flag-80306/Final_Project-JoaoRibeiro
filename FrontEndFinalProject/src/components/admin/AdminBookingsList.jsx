import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import bookingsServerCalls from '../../services/bookingsServerCalls.js';
import AdminBookingRegistration from './AdminBookingRegistration.jsx';
import AdminBookingDelete from './AdminBookingDelete.jsx';

function toggleTable() {
	const tableContainer = document.getElementById('table-container-bookings');
	if (tableContainer.classList.contains('hidden')) {
		tableContainer.classList.remove('hidden');
	} else {
		tableContainer.classList.add('hidden');
	}
}

function toggleAddBooking() {
	const containerAddBooking = document.getElementById('containerAddBooking');
	if (containerAddBooking.classList.contains('hidden')) {
		containerAddBooking.classList.remove('hidden');
	} else {
		containerAddBooking.classList.add('hidden');
	}
}

function AdminBookingsList() {
	const [bookings, setBookings] = useState([]);

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
							{bookings?.map((booking, index) => (
								<tr key={index}>
									<td>{booking.booking_id}</td>
									<td>{booking.tour_name}</td>
									<td>{booking.client_name}</td>
									<td>{booking.client_id}</td>
									<td>{booking.people}</td>
									<td>{booking.final_price} €</td>
									<td>{booking.booking_date}</td>
									<td>{booking.guide_name}</td>
									<td>
										<Link href={`/admin/booking/${booking.booking_id}`}>
											<button className='button'>Edit</button>
										</Link>
										<AdminBookingDelete booking_id={booking.booking_id} bookings={bookings} setBookings={setBookings} />
									</td>
								</tr>
							))}

							<tr>
								<td colSpan='9'>
									<button className='button' onClick={toggleAddBooking}>
										Add New Booking
									</button>
									<div id='containerAddBooking' className='hidden'>
										<AdminBookingRegistration setBookings={setBookings} />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
export default AdminBookingsList;
