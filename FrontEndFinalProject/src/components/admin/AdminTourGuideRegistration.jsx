import React, { useState } from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminTourGuideRegistration() {
	const [tourID, setTourID] = useState('');
	const [guideID, setGuideID] = useState('');

	async function handlePostSubmit(event) {
		event.preventDefault();

		const body = {
			tour_id: tourID,
			guide_id: guideID,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/tour_guide/register`;
			const response = await fetch(url, options);
			const result = await response.json();
			if (response.ok) {
				console.log('Relation successful', result);
				alert('New relation created!');
				window.location.reload();
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
				<h2>Creat a new relation tour-guide</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Tour ID:</label>
						<input type='text' value={tourID} onChange={e => setTourID(e.target.value)} />
					</div>
					<div>
						<label>Guide ID:</label>
						<input type='text' value={guideID} onChange={e => setGuideID(e.target.value)} />
					</div>
					<button type='submit' className='button'>
						Make New Relation
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminTourGuideRegistration;
