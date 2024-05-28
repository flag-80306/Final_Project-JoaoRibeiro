import React from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminBookingDelete({ booking_id, bookings, setBookings }) {
	async function handleDeleteSubmit() {
		const adminConfirmed = window.confirm(`Are you sure you want to delete booking ${booking_id}?`);
		if (!adminConfirmed) {
			return;
		}

		const options = {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/bookings/${booking_id}`;

			const response = await fetch(url, options);

			const result = await response.json();

			if (response.ok) {
				console.log(`Booking ${booking_id} deleted`, result);
				alert(`Booking ${booking_id} deleted`);

				const deleteBooking = bookings.filter(booking => !(booking.booking_id === booking_id));

				setBookings(deleteBooking);
			} else {
				console.error('Delete failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<div className='bt_space'>
				<button onClick={handleDeleteSubmit} className='button_red'>
					Delete Booking
				</button>
			</div>
		</>
	);
}

export default AdminBookingDelete;
