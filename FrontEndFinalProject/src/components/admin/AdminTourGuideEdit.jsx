import React, { useState } from 'react';
import { useRoute } from 'wouter';
const baseDomain = 'http://localhost:3000';

// import clientsServerCalls from '../services/clientsServerCalls.js';

function AdminUpdateGuideInfoView() {
	const [match, params] = useRoute('/admin/tourguide/:guide_id');
	const guide_id = params ? params.guide_id : null;
	const [guideID, setGuideID] = useState('');
	// const [description, setDescription] = useState('');
	// const [picture, setPicture] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			guide_id: guideID,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		if (!guide_id) {
			console.error('Guide ID is undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/tour_guide/${tour_id}/${guide_id}`;
			const response = await fetch(url, options);
			const result = await response.json();

			if (response.ok) {
				alert('Guide ID updated with success');
				console.log('Guide ID updated with success', options.body);
			} else {
				console.error('Guide ID update failed: ', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<div>
				{/* <h2>Update Guide</h2> */}
				<form onSubmit={handleSubmit}>
					<div>
						<label for='guideID'>Guide's ID:</label>
						<input type='text' id='guideID' value={guideID} onChange={e => setGuideID(e.target.value)}></input>
					</div>
					<button type='submit' className='button'>
						Update Now!
					</button>
				</form>
				{/* <div className='bt_space'>
					<Link href={'/admin/home'}>
						<button className='button'>Return main page</button>
					</Link>
				</div> */}
			</div>
		</>
	);
}

export default AdminUpdateGuideInfoView;
