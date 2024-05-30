import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function ClientRateRegistration({ booking_id, tour_id, rating }) {
	const [match, params] = useRoute('/bookings/client/:client_id');
	const client_id = params ? params.client_id : null;
	const [rate, setRate] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();
		console.log('bananananana', rating);
		if (rating != null) {
			document.getElementById('hideForm').style.display = 'none';

			return;
		}
		const body = {
			tour_id,
			client_id,
			rate,
			booking_id,
		};
		console.log('body', body);
		const options = {
			method: 'Post',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		try {
			// if (`${guide_id}` != 4) {
			const url = `${baseDomain}/rate/register`;
			// console.log(url);
			const response = await fetch(url, options);
			// console.log('response', response);
			const result = await response.json();
			console.log('res', result);
			if (response.ok) {
				alert('Tour rate submited with success');
				console.log('Tour rate submited with success', options.body);
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
			<div>
				<form onSubmit={handleSubmit} id='hideForm'>
					<label htmlFor='rate' className='fsz28' id='hideLabel'>
						1 (lowest) <br />
						to
						<br /> 5 (highest):
					</label>
					<br />
					<input className='inputs wdt100' type='number' max={5} min={1} value={rate} onChange={e => setRate(e.target.value)} id='rate'></input>

					<button type='submit' className='button'>
						Rate
					</button>
				</form>
			</div>
		</>
	);
}

export default ClientRateRegistration;
