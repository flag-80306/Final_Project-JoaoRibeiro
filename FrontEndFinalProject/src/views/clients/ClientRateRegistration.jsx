import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';

import bookingsServerCalls from '../../services/bookingsServerCalls';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function ClientRateRegistration({ booking_id, tour_id }) {
	const [match, params] = useRoute('/bookings/client/:client_id');
	const client_id = params ? params.client_id : null;
	const [rate, setRate] = useState('');
	const [rating, setRating] = useState('');

	useEffect(() => {
		async function fetchALLTours() {
			const rateID = await bookingsServerCalls.getBookingByID(booking_id);

			setRating(rateID);
		}
		fetchALLTours();
	}, [tour_id]);

	async function handleSubmit(event) {
		event.preventDefault();
		const body = {
			tour_id,
			client_id,
			rate,
			booking_id,
		};

		const options = {
			method: 'Post',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		try {
			const url = `${baseDomain}/rate/register`;

			const response = await fetch(url, options);

			const result = await response.json();

			if (response.ok) {
				alert('Tour rate submited with success');
				window.location.reload();
			} else {
				console.error('Tour rate failed: ', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			{rating.rate === null && (
				<div>
					<form onSubmit={handleSubmit} id='hideForm'>
						<label htmlFor='rate' className='fsz28' id='hideLabel'>
							1 (lowest) <br />
							to
							<br /> 5 (highest):
						</label>
						<br />
						<input className='inputs wdt100' type='number' max={5} min={1} value={rate} onChange={e => setRate(e.target.value)} id='rate'></input>

						<button type='submit' className='button' id='rated'>
							Rate
						</button>
					</form>
				</div>
			)}
		</>
	);
}

export default ClientRateRegistration;
