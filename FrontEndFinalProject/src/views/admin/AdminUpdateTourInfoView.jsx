import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
import AdminNavBar from '../../components/AdminNavBar.jsx';
import AdminFooterBar from '../../components/AdminFooterBar.jsx';
// import clientsServerCalls from '../services/clientsServerCalls.js';

function AdminUpdateTourInfoView() {
	const [match, params] = useRoute('/admin/tour/:tour_id');
	const tour_id = params ? params.tour_id : null;
	const [tourName, setTourName] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [pricePerson, setPricePerson] = useState('');
	// const [review, setReview] = useState('');
	const [images, setImages] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			tour_name: tourName,
			location,
			description,
			duration,
			price_person: pricePerson,
			// review_id: review,
			images,
		};

		const options = {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		if (!tour_id) {
			console.error('Tour ID is undefined');
			return null;
		}
		try {
			const url = `${baseDomain}/tours/${tour_id}`;

			const response = await fetch(url, options);
			const result = await response.json();

			if (response.ok) {
				alert('Tour Info updated with success');
				console.log('Tour Info updated with success', options.body);
			} else {
				console.error('Tour Info update failed:', result.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<AdminNavBar />
			<div>
				<h2>Update Tour Information</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='tourName'>Tour Name:</label>
						<input type='text' id='tourName' value={tourName} onChange={e => setTourName(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='location'>Location:</label>
						<input type='text' id='location' value={location} onChange={e => setLocation(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='description'>Description:</label>
						<input type='text' id='description' value={description} onChange={e => setDescription(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='duration'>Duration:</label>
						<input type='text' id='duration' value={duration} onChange={e => setDuration(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='pricePerson'>Price per Person:</label>
						<input type='text' id='pricePerson' value={pricePerson} onChange={e => setPricePerson(e.target.value)}></input>
					</div>

					<div>
						<label htmlFor='images'>Images:</label>
						<input type='text' id='images' value={images} onChange={e => setImages(e.target.value)}></input>
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
			<AdminFooterBar />
		</>
	);
}

export default AdminUpdateTourInfoView;
