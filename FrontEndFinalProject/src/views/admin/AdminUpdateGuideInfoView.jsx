import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
import AdminNavBar from '../../components/HomeNavBar.jsx';
import AdminFooterBar from '../../components/AdminFooterBar.jsx';
// import clientsServerCalls from '../services/clientsServerCalls.js';

function AdminUpdateGuideInfoView() {
	const [match, params] = useRoute('/admin/guide/:guide_id');
	const guide_id = params ? params.guide_id : null;
	const [guideName, setGuideName] = useState('');
	const [description, setDescription] = useState('');
	const [picture, setPicture] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			guide_name: guideName,
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
			<AdminNavBar />
			<div className='m20'>
				<h1>Update Guide Information</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='guideName' className='fsz28'>
							Guide's Name:
						</label>
						<input className='inputs m20' type='text' id='guideName' value={guideName} onChange={e => setGuideName(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='description' className='fsz28'>
							Description:
						</label>
						<input className='inputs m20' type='text' id='description' value={description} onChange={e => setDescription(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='picture' className='fsz28'>
							Picture:
						</label>
						<input className='inputs m20' type='text' id='picture' value={picture} onChange={e => setPicture(e.target.value)}></input>
					</div>

					<button type='submit' className='button m20'>
						Update Now!
					</button>
				</form>
				<div className='bt_space'>
					<Link href={'/admin/home'}>
						<button className='button m20'>Return main page</button>
					</Link>
				</div>
			</div>
			<AdminFooterBar />
		</>
	);
}

export default AdminUpdateGuideInfoView;
