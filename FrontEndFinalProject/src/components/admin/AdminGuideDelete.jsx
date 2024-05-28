import React from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminGuideDelete({ guide_id, guides, setGuides }) {
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
				alert(`Guide ${guide_id} deleted`);

				const updatedGuides = guides.filter(guide => !(guide.guide_id === guide_id));

				setGuides(updatedGuides);
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
					Delete Guide
				</button>
			</div>
		</>
	);
}

export default AdminGuideDelete;
