import React from 'react';

const baseDomain = 'http://localhost:3000';

function AdminTourGuideDelete({ tour_id, guide_id, tourGuides, setTourGuides }) {
	async function handleDeleteSubmit() {
		if (!guide_id) {
			console.error('Guide ID is missing.', guide_id);
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
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<div className='bt_space'>
				<button onClick={handleDeleteSubmit} className='button'>
					Delete Relation
				</button>
			</div>
		</>
	);
}

export default AdminTourGuideDelete;
