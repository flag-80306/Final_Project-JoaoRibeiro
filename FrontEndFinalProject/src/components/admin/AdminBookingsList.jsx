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
								<th>
									Tour Name <br />
									(Guide Name)
								</th>
								<th>
									Client <br />
									(Id & Name)
								</th>

								<th>
									Final Price <br />
									(Group size)
								</th>

								<th>Booking Date</th>

								<th>Edit Booking</th>
							</tr>
						</thead>
						<tbody>
							{bookings?.map((booking, index) => (
								<tr key={index}>
									<td>{booking.booking_id}</td>
									<td>
										{booking.tour_name}
										<br />({booking.guide_name})
									</td>
									<td>
										{booking.client_id}
										<br />
										{booking.client_name}
									</td>
									<td>
										{booking.final_price} € <br />({booking.people} pax)
									</td>

									<td>{new Date(booking.booking_date)?.toISOString().slice(0, 10)}</td>
									<td>
										<Link href={`/admin/booking/${booking.booking_id}`}>
											<button className='button'>Edit</button>
										</Link>
										<AdminBookingDelete booking_id={booking.booking_id} bookings={bookings} setBookings={setBookings} />
									</td>
								</tr>
							))}

							<tr>
								<td colSpan='6'>
									<button className='button_yellow' onClick={toggleAddBooking}>
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
