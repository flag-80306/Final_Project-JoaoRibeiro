import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
import AdminNavBar from '../../components/AdminNavBar.jsx';
import AdminFooterBar from '../../components/AdminFooterBar.jsx';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

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
			if (`${guide_id}` != 4) {
				const url = `${baseDomain}/tour_guide/${tour_id}/${guide_id}`;

				const response = await fetch(url, options);

				const result = await response.json();

				if (response.ok) {
					alert('Guide ID updated with success');
				} else {
					console.error('Guide ID update failed: ', result.message);
				}
			} else {
				alert(`Relation with guide_id ${guide_id} can not be updated`);
				throw new Error('You cannot update guide_id = 4!!!');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<AdminNavBar />
			<div className='m20'>
				<h1>Update Guide</h1>
				<form onSubmit={handleSubmit} className='m20'>
					<div>
						<label htmlFor='guideID' className='fsz28'>
							Guide's ID:
						</label>
						<input className='inputs m20' type='text' id='guideID' value={guideID} onChange={e => setGuideID(e.target.value)}></input>
					</div>
					<button type='submit' className='button m20'>
						Update Now!
					</button>
				</form>
			</div>
			<div className='bt_space'>
				<Link href={'/admin/home'}>
					<button className='button m20'>Return main page</button>
				</Link>
			</div>
			<AdminFooterBar />
		</>
	);
}

export default AdminUpdateTourGuideView;
