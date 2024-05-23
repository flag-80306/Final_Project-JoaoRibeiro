import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';

function AdminTourRegistration() {
	const [tourName, setTourName] = useState('');
	const [location, setLocation] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [pricePerson, setPricePerson] = useState('');
	const [images, setImages] = useState('');

	async function handlePostSubmit(event) {
		event.preventDefault();

		const body = {
			tour_name: tourName,
			location,
			latitude,
			longitude,
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
			console.log('url', url);
			const response = await fetch(url, options);
			console.log('response', response);
			const result = await response.json();
			console.log('res', result);
			console.log(result);

			if (response.ok) {
				console.log('Registration successful', result);
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
				<h2>Tour Registration</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Tour Name:</label>
						<input type='text' value={tourName} onChange={e => setTourName(e.target.value)} />
					</div>
					<div>
						<label>Location:</label>
						<input type='text' value={location} onChange={e => setLocation(e.target.value)} />
					</div>
					<div>
						<label>Latitude:</label>
						<input type='text' value={latitude} onChange={e => setLatitude(e.target.value)} />
					</div>
					<div>
						<label>Longitude:</label>
						<input type='text' value={longitude} onChange={e => setLongitude(e.target.value)} />
					</div>
					<div>
						<label>Description:</label>
						<input type='text' value={description} onChange={e => setDescription(e.target.value)} />
					</div>
					<div>
						<label>Duration:</label>
						<input type='text' value={duration} onChange={e => setDuration(e.target.value)} />
					</div>
					<div>
						<label>Price per Person:</label>
						<input type='text' value={pricePerson} onChange={e => setPricePerson(e.target.value)} />
					</div>
					<div>
						<label>Images</label>
						<input type='text' value={images} onChange={e => setImages(e.target.value)} />
					</div>
					<button type='submit' className='button'>
						Make registration
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminTourRegistration;
