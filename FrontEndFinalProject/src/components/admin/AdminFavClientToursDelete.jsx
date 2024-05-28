import React from 'react';

const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminFavClientToursDelete({ client_id, tour_id, favTours, setFavTours }) {
	async function handleDeleteSubmit() {
		if (!tour_id) {
			console.error('Tour ID is missing.');
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
				console.log(`${client_id} delete favourite tour ${tour_id}`, result);
				alert(`Relation ${client_id} & favourite tour ${tour_id} deleted`);

				const updatedFavTours = favTours.filter(favTour => !(favTour.client_id === client_id && favTour.tour_id === tour_id));
				console.log('updatedFavTours', updatedFavTours);
				setFavTours(updatedFavTours);
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
					Delete Relation
				</button>
			</div>
		</>
	);
}

export default AdminFavClientToursDelete;
