import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
import AdminNavBar from '../../components/AdminNavBar.jsx';
import AdminFooterBar from '../../components/AdminFooterBar.jsx';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminUpdateFavClientTourView() {
	const [match, params] = useRoute('/admin/favourite-tour/:client_id/:tour_id');
	const client_id = params ? params.client_id : null;
	const tour_id = params ? params.tour_id : null;

	const [tourID, setTourID] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			newTour_id: tourID,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		if (!client_id || !tour_id) {
			console.error('Tour ID or guide ID are undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/favourite_tours/${client_id}/${tour_id}`;
			const response = await fetch(url, options);

			const result = await response.json();

			if (response.ok) {
				alert('Tour ID updated with success');
			} else {
				console.error('Tour ID update failed: ', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<AdminNavBar />
			<div className='m20'>
				<h1>Update Client Favourite Tour</h1>
				<form onSubmit={handleSubmit} className='m20'>
					<div>
						<label htmlFor='tourID' className='fsz28'>
							Tour's ID:
						</label>
						<input className='inputs m20' type='text' id='tourID' value={tourID} onChange={e => setTourID(e.target.value)}></input>
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

export default AdminUpdateFavClientTourView;
