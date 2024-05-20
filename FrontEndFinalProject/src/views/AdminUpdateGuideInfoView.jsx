import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
const baseDomain = 'http://localhost:3000';
import NavBar from '../components/NavBar.jsx';
import FooterBar from '../components/FooterBar.jsx';
// import clientsServerCalls from '../services/clientsServerCalls.js';

function AdminUpdateGuideInfoView() {
	const [match, params] = useRoute('/admin/guide/:guide_id');
	const guide_id = params ? params.guide_id : null;
	const [guideName, setGuideName] = useState('');
	const [guideUsername, setGuideUsername] = useState('');
	const [description, setDescription] = useState('');
	const [picture, setPicture] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			guide_name: guideName,
			guide_username: guideUsername,
			description,
			picture,
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
			const url = `${baseDomain}/guides/${guide_id}`;

			const response = await fetch(url, options);
			const result = await response.json();

			if (response.ok) {
				alert('Guide Info updated with success');
				console.log('Guide Info updated with success', options.body);
			} else {
				console.error('Guide Info update failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<NavBar />
			<div>
				<h2>Update Guide Information</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label for='guideName'>Guide's Name:</label>
						<input type='text' id='guideName' value={guideName} onChange={e => setGuideName(e.target.value)}></input>
					</div>
					<div>
						<label for='guideUsername'>Guide Username:</label>
						<input type='text' id='guideUsername' value={guideUsername} onChange={e => setGuideUsername(e.target.value)}></input>
					</div>
					<div>
						<label for='description'>Description:</label>
						<input type='text' id='description' value={description} onChange={e => setDescription(e.target.value)}></input>
					</div>
					<div>
						<label for='picture'>Picture:</label>
						<input type='text' id='picture' value={picture} onChange={e => setPicture(e.target.value)}></input>
					</div>

					<button type='submit' className='button'>
						Update Now!
					</button>
				</form>
				<div className='bt_space'>
					<Link href={'/admin/home'}>
						<button className='button'>Return main page</button>
					</Link>
				</div>
			</div>
			<FooterBar />
		</>
	);
}

export default AdminUpdateGuideInfoView;
