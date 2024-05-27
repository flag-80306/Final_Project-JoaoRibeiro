import React from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function ClientBookingDelete({ booking_id, clientBookings, setClientBookings }) {
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

				const deleteClientBooking = clientBookings.filter(booking => !(booking.booking_id === booking_id));

				setClientBookings(deleteClientBooking);
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
				<button onClick={handleDeleteSubmit} className='button'>
					Delete Booking
				</button>
			</div>
		</>
	);
}

export default ClientBookingDelete;
