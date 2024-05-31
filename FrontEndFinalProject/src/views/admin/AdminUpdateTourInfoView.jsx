import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
import AdminNavBar from '../../components/AdminNavBar.jsx';
import AdminFooterBar from '../../components/AdminFooterBar.jsx';

function AdminUpdateTourInfoView() {
	const [match, params] = useRoute('/admin/tour/:tour_id');
	const tour_id = params ? params.tour_id : null;
	const [tourName, setTourName] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [pricePerson, setPricePerson] = useState('');

	const [images, setImages] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const body = {
			tour_name: tourName,
			location,
			description,
			duration,
			price_person: pricePerson,

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
			<div className='m20'>
				<h1>Update Tour Information</h1>
				<form onSubmit={handleSubmit} className='m20'>
					<div>
						<label htmlFor='tourName' className='fsz28'>
							Tour Name:
						</label>
						<input className='inputs m20' type='text' id='tourName' value={tourName} onChange={e => setTourName(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='location' className='fsz28'>
							Location:
						</label>
						<input className='inputs m20' type='text' id='location' value={location} onChange={e => setLocation(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='description' className='fsz28'>
							Description:
						</label>
						<input className='inputs m20' type='text' id='description' value={description} onChange={e => setDescription(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='duration' className='fsz28'>
							Duration:
						</label>
						<input className='inputs m20' type='text' id='duration' value={duration} onChange={e => setDuration(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor='pricePerson' className='fsz28'>
							Price per Person:
						</label>
						<input className='inputs m20' type='text' id='pricePerson' value={pricePerson} onChange={e => setPricePerson(e.target.value)}></input>
					</div>

					<div>
						<label htmlFor='images' className='fsz28'>
							Images:
						</label>
						<input className='inputs m20' type='text' id='images' value={images} onChange={e => setImages(e.target.value)}></input>
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

export default AdminUpdateTourInfoView;
