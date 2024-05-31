import React, { useState } from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminTourGuideRegistration({ setTourGuides }) {
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
				alert('New relation created!');
				setTourGuides(prevTourGuide => [...prevTourGuide, result]);
			} else {
				if (Error) {
					alert(`${guideID} guide is already doing ${tourID} TourID !`);
					throw new Error(`${guideID} guide is already doing ${tourID} TourID !`);
				} else {
					console.error('Registration failed:', result.message);
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<div>
				<h2 className='m10'>Creat a new relation tour-guide</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Tour ID:</label>
						<input className='inputs m10' type='text' value={tourID} onChange={e => setTourID(e.target.value)} />
					</div>
					<div>
						<label>Guide ID:</label>
						<input className='inputs m10' type='text' value={guideID} onChange={e => setGuideID(e.target.value)} />
					</div>
					<button type='submit' className='button_yellow'>
						Make New Relation
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminTourGuideRegistration;
