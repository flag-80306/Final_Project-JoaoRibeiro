import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
import NavBar from '../../components/NavBar';
import FooterBar from '../../components/FooterBar';
const baseDomain = 'http://localhost:3000';

function AdminUpdateTourGuideView() {
	const [match, params] = useRoute('/admin/tour-guide/:tour_id/:guide_id');
	const tour_id = params ? params.tour_id : null;
	const guide_id = params ? params.guide_id : null;
	const [guideID, setGuideID] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			newGuide_id: guideID,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		if (!tour_id || !guide_id) {
			console.error('Tour ID or guide ID are undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/tour_guide/${tour_id}/${guide_id}`;
			const response = await fetch(url, options);
			console.log('response', response);
			const result = await response.json();
			console.log('res', result);
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
			<NavBar />
			<div>
				<h2>Update Guide</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label for='guideID'>Guide's ID:</label>
						<input type='text' id='guideID' value={guideID} onChange={e => setGuideID(e.target.value)}></input>
					</div>
					<button type='submit' className='button'>
						Update Now!
					</button>
				</form>
			</div>
			<div className='bt_space'>
				<Link href={'/admin/home'}>
					<button className='button'>Return main page</button>
				</Link>
			</div>
			<FooterBar />
		</>
	);
}

export default AdminUpdateTourGuideView;
