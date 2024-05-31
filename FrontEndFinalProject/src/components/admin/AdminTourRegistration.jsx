import React, { useState } from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminTourRegistration() {
	const [tourName, setTourName] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [pricePerson, setPricePerson] = useState('');
	const [images, setImages] = useState('');

	async function handlePostSubmit(event) {
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
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/tours/register`;

			const response = await fetch(url, options);

			const result = await response.json();
			console.log('rererer', result);
			if (response.ok) {
				alert('New booking created!');
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
				<h2 className='m10'>Tour Registration</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Tour Name:</label>
						<input className='inputs m10' type='text' value={tourName} onChange={e => setTourName(e.target.value)} />
					</div>
					<div>
						<label>Location:</label>
						<input className='inputs m10' type='text' value={location} onChange={e => setLocation(e.target.value)} />
					</div>
					<div>
						<label>Description:</label>
						<input className='inputs m10' type='text' value={description} onChange={e => setDescription(e.target.value)} />
					</div>
					<div>
						<label>Duration:</label>
						<input className='inputs m10' type='number' min={1} max={10} value={duration} onChange={e => setDuration(e.target.value)} />
					</div>
					<div>
						<label>Price per Person:</label>
						<input className='inputs m10' type='number' value={pricePerson} onChange={e => setPricePerson(e.target.value)} />
					</div>
					<div>
						<label>Images</label>
						<input className='inputs m10' type='text' value={images} onChange={e => setImages(e.target.value)} />
					</div>
					<button type='submit' className='button_yellow'>
						Make registration
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminTourRegistration;
