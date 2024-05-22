import React from 'react';
const baseDomain = 'http://localhost:3000';

function AdminTourGuideDelete({ tour_id, guide_id }) {
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
			console.log(response);
			console.log(result);
			if (response.ok) {
				console.log(`Relation ${tour_id} & ${guide_id} deleted`, result);
			} else {
				console.error('Delete failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		window.location.reload();
		alert(`Relation ${tour_id} & ${guide_id} deleted`);
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
