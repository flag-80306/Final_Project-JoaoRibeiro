import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
import AdminNavBar from '../../components/AdminNavBar.jsx';
import AdminFooterBar from '../../components/AdminFooterBar.jsx';

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
			} else {
				console.error('"Use a future date for booking. Registration failed. Please try again later:', result.message);
				alert('"Use a future date for booking. Registration failed. Please try again later.');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<AdminNavBar />
			<div className='m20'>
				<h1>Update Booking Information</h1>
				<form onSubmit={handleSubmit} className='m20'>
					<div>
						<label htmlFor='tourID' className='fsz28'>
							Tour ID:{' '}
						</label>
						<input className='inputs m20' type='text' id='tourID' value={tourID} onChange={e => seTourID(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='guideID' className='fsz28'>
							Guide ID:
						</label>
						<input className='inputs m20' type='text' id='guideID' value={guideID} onChange={e => setGuideID(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='clientID' className='fsz28'>
							Client ID:
						</label>
						<input className='inputs m20' type='text' id='clientID' value={clientID} onChange={e => setClientID(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='people' className='fsz28'>
							People:
						</label>
						<input className='inputs m20' type='text' id='people' value={people} onChange={e => setPeople(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='finalPrice' className='fsz28'>
							Final Price:
						</label>
						<input className='inputs m20' type='text' id='finalPrice' value={finalPrice} onChange={e => setFinalPrice(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='bookingDate' className='fsz28'>
							Booking Date:
						</label>
						<input className='inputs m20' type='date' id='bookingDate' value={bookingDate} onChange={e => setBookingDate(e.target.value)}></input>
					</div>

					<button type='submit' className='button m20'>
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
