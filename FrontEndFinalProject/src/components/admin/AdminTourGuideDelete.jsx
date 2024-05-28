import React from 'react';

const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminTourGuideDelete({ tour_id, guide_id, tourGuides, setTourGuides }) {
	async function handleDeleteSubmit() {
		if (!guide_id) {
			console.error('Guide ID is missing.');
			return;
		}

		const adminConfirmed = window.confirm(`Are you sure you want to delete this relation ${tour_id} & ${guide_id}?`);
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
			if (`${guide_id}` != 4) {
				const url = `${baseDomain}/tour_guide/${tour_id}/${guide_id}`;
				const response = await fetch(url, options);
				const result = await response.json();

				if (response.ok) {
					console.log(`Relation ${tour_id} & ${guide_id} deleted`, result);
					alert(`Relation ${tour_id} & ${guide_id} deleted`);

					const updatedTourGuides = tourGuides.filter(tourGuide => !(tourGuide.tour_id === tour_id && tourGuide.guide_id === guide_id));
					console.log('updatedTourGuides', updatedTourGuides);
					setTourGuides(updatedTourGuides);
				} else {
					console.error('Delete failed:', result.message);
				}
			} else {
				alert(`guide_id ${guide_id} can not be deleted`);
				throw new Error('You cannot delete guide_id = 4!!!');
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

export default AdminTourGuideDelete;
