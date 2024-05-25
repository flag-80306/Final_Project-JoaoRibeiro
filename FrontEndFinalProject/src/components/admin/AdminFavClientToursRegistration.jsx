import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';

function AdminFavClientToursRegistration({ setFavTours }) {
	const [clientID, setClientID] = useState('');
	const [tourID, setTourID] = useState('');

	async function handlePostSubmit(event) {
		event.preventDefault();

		const body = {
			client_id: clientID,
			tour_id: tourID,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/favourite_tours/register`;
			const response = await fetch(url, options);
			const result = await response.json();
			if (response.ok) {
				console.log('Favourite Tour added successfully', result);
				alert('Favourite Tour added successfully!');
				window.location.reload();

				// setFavTours(prevFavTours => [...prevFavTours, result]);
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
				<h2>Add Client Favourite Tour</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Client ID:</label>
						<input type='text' value={clientID} onChange={e => setClientID(e.target.value)} />
					</div>
					<div>
						<label>Tour ID:</label>
						<input type='text' value={tourID} onChange={e => setTourID(e.target.value)} />
					</div>

					<button type='submit' className='button'>
						Add Tour to Favourites
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminFavClientToursRegistration;
