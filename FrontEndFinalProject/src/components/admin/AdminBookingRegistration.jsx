import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';

function AdminBookingRegistration({ setBookings }) {
	const [tourID, setTourID] = useState('');
	const [clientID, setClientID] = useState('');
	const [guideID, setGuideID] = useState('');
	const [people, setPeople] = useState('');
	const [finalPrice, setFinalPrice] = useState('');
	const [bookingDate, setBookingDate] = useState('');

	async function handlePostSubmit(event) {
		event.preventDefault();

		const body = {
			tour_id: tourID,
			client_id: clientID,
			guide_id: guideID,
			people,
			final_price: finalPrice,
			booking_date: bookingDate,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/bookings/`;
			const response = await fetch(url, options);
			const result = await response.json();
			if (response.ok) {
				console.log('Registration successful', result);
				alert('New booking created!');
				setBookings(prevBookings => [...prevBookings, result]);
				window.location.reload();
			} else {
				console.error('Registration failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<div>
				<h2>Booking Registration</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Tour ID:</label>
						<input type='text' value={tourID} onChange={e => setTourID(e.target.value)} />
					</div>
					<div>
						<label>Client ID:</label>
						<input type='text' value={clientID} onChange={e => setClientID(e.target.value)} />
					</div>
					<div>
						<label>Guide ID:</label>
						<input type='text' value={guideID} onChange={e => setGuideID(e.target.value)} />
					</div>
					<div>
						<label>People:</label>
						<input type='number' value={people} onChange={e => setPeople(e.target.value)} />
					</div>
					<div>
						<label>Final Price:</label>
						<input type='text' value={finalPrice} onChange={e => setFinalPrice(e.target.value)} />
					</div>
					<div>
						<label>Booking Date:</label>
						<input type='date' value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
					</div>
					<button type='submit' className='button'>
						Make Booking Registration
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminBookingRegistration;
