import React from 'react';
const baseDomain = 'http://localhost:3000';

function AdminGuideDelete({ guide_id }) {
	async function handleDeleteSubmit() {
		const adminConfirmed = window.confirm(`Are you sure you want to delete guide ${guide_id}?`);
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
			const url = `${baseDomain}/guides/${guide_id}`;
			const response = await fetch(url, options);
			const result = await response.json();

			if (response.ok) {
				console.log(`Guide ${guide_id} deleted`);
			} else {
				console.error('Delete failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		alert(`Guide ${guide_id} deleted`);
		window.location.reload();
	}

	return (
		<>
			<div className='bt_space'>
				<button onClick={handleDeleteSubmit} className='button'>
					Delete Guide
				</button>
			</div>
		</>
	);
}

export default AdminGuideDelete;
