import React, { useState } from 'react';
const baseDomain = 'http://localhost:3000';

function AdminClientRegistration() {
	const [guideName, setGuideName] = useState('');
	const [description, setDescription] = useState('');
	const [picture, setPicture] = useState('');
	const [tourID, setTourID] = useState('');

	async function handlePostSubmit(event) {
		event.preventDefault();

		const body = {
			guide_name: guideName,
			description,
			picture,
			// tour_id: tourID
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/guides/`;
			const response = await fetch(url, options);
			if (response.ok) {
				const result = await response.json();
				console.log('Registration successful', result);
				alert(`Registration successful!! New Guide!!!`);
				window.location.reload();
			} else {
				const errorResult = await response.json();
				console.error('Registration failed:', errorResult.message);
				alert(`Registration failed: ${errorResult.message}`);
			}
		} catch (error) {
			console.error('Error:', error);
			alert(`Error: ${error.message}`);
		}
	}

	return (
		<>
			<div>
				<h2>Guide Registration</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Guide Name:</label>
						<input type='text' value={guideName} onChange={e => setGuideName(e.target.value)} />
					</div>
					<div>
						<label>Description:</label>
						<input type='text' value={description} onChange={e => setDescription(e.target.value)} />
					</div>
					<div>
						<label>Picture:</label>
						<input type='text' value={picture} onChange={e => setPicture(e.target.value)} />
					</div>
					{/* <div>
						<label>Tour ID:</label>
						<input type='text' value={tourID} onChange={e => setTourID(e.target.value)} />
					</div> */}
					<button type='submit' className='button'>
						Make registration
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminClientRegistration;
