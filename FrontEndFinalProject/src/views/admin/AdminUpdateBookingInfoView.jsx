import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
const baseDomain = 'http://localhost:3000';
import AdminNavBar from '../../components/AdminNavBar.jsx';
import AdminFooterBar from '../../components/AdminFooterBar.jsx';
// import clientsServerCalls from '../services/clientsServerCalls.js';

function AdminUpdateBookingInfoView() {
	const [match, params] = useRoute('/admin/booking/:booking_id');
	const booking_id = params ? params.booking_id : null;
	const [tourID, seTourID] = useState('');
	const [guideID, setGuideID] = useState('');
	const [clientID, setClientID] = useState('');
	const [people, setPeople] = useState('');
	const [finalPrice, setFinalPrice] = useState('');
	const [bookingDate, setBookingDate] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			tour_id: tourID,
			guide_id: guideID,
			client_id: clientID,
			people,
			final_price: finalPrice,
			booking_date: bookingDate,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		if (!booking_id) {
			console.error('Booking ID is undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/bookings/${booking_id}`;

			const response = await fetch(url, options);
			const result = await response.json();

			if (response.ok) {
				alert('Booking Info updated with success');
				console.log('Booking Info updated with success', options.body);
			} else {
				console.error('Booking Info update failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<AdminNavBar />
			<div>
				<h2>Update Booking Information</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label for='tourID'>Tour ID: </label>
						<input type='text' id='tourID' value={tourID} onChange={e => seTourID(e.target.value)}></input>
					</div>
					<div>
						<label for='guideID'>Guide ID:</label>
						<input type='text' id='guideID' value={guideID} onChange={e => setGuideID(e.target.value)}></input>
					</div>
					<div>
						<label for='clientID'>Client ID:</label>
						<input type='text' id='clientID' value={clientID} onChange={e => setClientID(e.target.value)}></input>
					</div>
					<div>
						<label for='people'>People:</label>
						<input type='text' id='people' value={people} onChange={e => setPeople(e.target.value)}></input>
					</div>
					<div>
						<label for='finalPrice'>Final Price:</label>
						<input type='text' id='finalPrice' value={finalPrice} onChange={e => setFinalPrice(e.target.value)}></input>
					</div>
					<div>
						<label for='bookingDate'>Booking Date:</label>
						<input type='date' id='bookingDate' value={bookingDate} onChange={e => setBookingDate(e.target.value)}></input>
					</div>

					<button type='submit' className='button'>
						Update Now!
					</button>
				</form>
			</div>
			<div className='bt_space'>
				<Link href={'/admin/home'}>
					<button className='button'>Return main page</button>
				</Link>
			</div>
			<AdminFooterBar />
		</>
	);
}

export default AdminUpdateBookingInfoView;
