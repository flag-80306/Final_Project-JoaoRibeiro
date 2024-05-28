import React from 'react';

const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function ClientFavTourDelete({ tour_id, client_id, favTours, setFavTours }) {
	async function handleDeleteSubmit() {
		if (!client_id) {
			console.error('Client ID is missing.');
			return;
		}

		const adminConfirmed = window.confirm(`Are you sure you want to delete this relation ${client_id} & ${tour_id}?`);
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
			const url = `${baseDomain}/favourite_tours/${client_id}/${tour_id}`;
			const response = await fetch(url, options);
			const result = await response.json();

			if (response.ok) {
				console.log(`Relation ${client_id} & ${tour_id} deleted`, result);
				alert(`Relation ${client_id} & ${tour_id} deleted`);

				const updatedFavClientTour = favTours.filter(favTour => !(favTour.client_id === client_id && favTour.tour_id === tour_id));
				console.log('updatedFavClientTour', updatedFavClientTour);
				setFavTours(updatedFavClientTour);
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
					Remove Tour from Favourites
				</button>
			</div>
		</>
	);
}

export default ClientFavTourDelete;
