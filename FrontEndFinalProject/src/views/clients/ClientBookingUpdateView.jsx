import React, { useEffect, useState } from 'react';

import bookingsServerCalls from '../../services/bookingsServerCalls.js';
import NavBar from '../../components/client/ClientNavBar.jsx';
import FooterBar from '../../components/client/ClientFooterBar.jsx';
import { jwtDecode } from 'jwt-decode';

import { Link, useRoute } from 'wouter';
const baseDomain = 'http://localhost:3000';

// import clientsServerCalls from '../services/clientsServerCalls.js';

function ClientBookingUpdateView() {
	const [match, params] = useRoute('/client/booking/:booking_id');
	const booking_id = params ? params.booking_id : null;
	const [booking, setBooking] = useState(null);
	const [guideID, setGuideID] = useState('');
	const [tourID, setTourID] = useState('');
	const [tourName, setTourName] = useState('');

	const [clientName, setClientName] = useState(null);
	const [clientID, setClientID] = useState(null);
	const [people, setPeople] = useState(1);

	const [bookingDate, setBookingDate] = useState('');
	console.log('id', booking_id);
	useEffect(() => {
		if (booking_id) {
			async function fetchTour() {
				const result = await bookingsServerCalls.getBookingByID(booking_id);

				console.log('result', result);
				setBooking(result);
				if (result.tour_id) {
					setTourID(result.tour_id);
				}
				if (result.guide_id) {
					setGuideID(result.guide_id);
				}
				if (result.client_name) {
					setClientName(result.client_name);
				}
				if (result.tour_name) {
					setTourName(result.tour_name);
				}
			}
			fetchTour();
		}

		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const { userID } = decodedToken;
			setClientID(userID);
		}
	}, [booking_id]);

	// console.log('tour', tour);
	if (!booking) {
		return <h3>Loading...</h3>;
	}
	console.log('people', booking.people);
	console.log('finalP', booking.final_price);
	const pricePerson = booking.final_price / booking.people;
	console.log('pricePerson', pricePerson);

	async function handleSubmit(event) {
		event.preventDefault();

		const finalPrice = pricePerson * people;
		console.log('finalPrice', finalPrice);
		const body = {
			tour_id: tourID,
			guide_id: guideID,
			client_id: clientID,
			people,
			final_price: finalPrice,
			booking_date: bookingDate,
			client_name: clientName,
			tour_name: tourName,
		};
		console.log('body', body);

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
			console.log('url', url);
			const response = await fetch(url, options);
			console.log('response', response);
			const result = await response.json();
			console.log('result', result);

			if (response.ok) {
				alert('Booking Info updated with success');
				console.log('Booking Info updated with success', options.body);
			} else {
				console.error('Use a future date for booking. Registration failed. Please try again later:', result);
				alert('"Use a future date for booking. Registration failed. Please try again.');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<NavBar />
			<div className='m20'>
				<h1>Update Booking Information</h1>
				<form onSubmit={handleSubmit}>
					<div className='m20'>
						<label>Booking ID: </label>
						<input className='inputs' type='text' value={booking.booking_id} disabled></input>
					</div>
					<div className='m20'>
						<label>Tour Name: </label>
						<input className='inputs' type='text' value={booking.tour_name} disabled></input>
					</div>
					<div>
						<input type='hidden' name='hiddenField' id='tourID' value={tourID} />
						<input type='hidden' name='hiddenField' id='guideID' value={guideID} />
						<input type='hidden' name='hiddenField' id='clientName' value={clientName} />
						<input type='hidden' name='hiddenField' id='tourName' value={tourName} />
					</div>
					<div>
						<label htmlFor='people'>People:</label>
						<input className='inputs' type='number' id='people' value={people} onChange={e => setPeople(e.target.value)} max={10}></input>
					</div>
					<div className='m20'>
						<label>Final Price:</label>
						<input className='inputs' type='text' value={`${pricePerson * people} €`} disabled />
					</div>
					<div className='m20'>
						<label htmlFor='bookingDate'>Booking Date:</label>
						<input className='inputs' type='date' id='bookingDate' value={bookingDate} onChange={e => setBookingDate(e.target.value)}></input>
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
			<FooterBar />
		</>
	);
}

export default ClientBookingUpdateView;
