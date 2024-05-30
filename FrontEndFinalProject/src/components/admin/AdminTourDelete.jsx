import React from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminTourDelete({ tour_id, tours, setTours }) {
	async function handleDeleteSubmit() {
		const adminConfirmed = window.confirm(`Are you sure you want to delete tour ${tour_id}?`);
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
			const url = `${baseDomain}/tours/${tour_id}`;

			const response = await fetch(url, options);

			const result = await response.json();

			if (response.ok) {
				alert(`Tour ${tour_id} deleted`);
				const updatedTours = tours.filter(tour => !(tour.tour_id === tour_id));
				setTours(updatedTours);
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
					Delete Tour
				</button>
			</div>
		</>
	);
}

export default AdminTourDelete;
