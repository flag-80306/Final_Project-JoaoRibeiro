import React, { useState } from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminClientRegistration({ setGuides }) {
	const [guideName, setGuideName] = useState('');
	const [description, setDescription] = useState('');
	const [picture, setPicture] = useState('');

	async function handlePostSubmit(event) {
		event.preventDefault();

		const body = {
			guide_name: guideName,
			description,
			picture,
		};

		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			const url = `${baseDomain}/guides/register`;
			const response = await fetch(url, options);
			const result = await response.json();
			if (response.ok) {
				console.log('Registration successful', result);
				alert(`Registration successful!! New Guide!!!`);
				setGuides(prevGuides => [...prevGuides, result]);
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
				<h2 className='m10'>Guide Registration</h2>
				<form onSubmit={handlePostSubmit}>
					<div>
						<label>Guide Name:</label>
						<input className='inputs m10' type='text' value={guideName} onChange={e => setGuideName(e.target.value)} />
					</div>
					<div>
						<label>Description:</label>
						<input className='inputs m10' type='text' value={description} onChange={e => setDescription(e.target.value)} />
					</div>
					<div>
						<label>Picture:</label>
						<input className='inputs m10' type='text' value={picture} onChange={e => setPicture(e.target.value)} />
					</div>

					<button type='submit' className='button_yellow'>
						Make registration
					</button>
				</form>
			</div>
		</>
	);
}

export default AdminClientRegistration;
