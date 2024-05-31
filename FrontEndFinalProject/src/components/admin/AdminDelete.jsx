import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminDelete({ manager_id, admins, setAdmins }) {
	const [admin, setAdmin] = useState(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);

			const { userID } = decodedToken;

			setAdmin({ manager_id: userID });
		}
	}, []);

	async function handleDeleteSubmit() {
		const adminConfirmed = window.confirm(`Are you sure you want to delete manager ${manager_id}?`);
		if (!adminConfirmed) {
			return;
		}

		const options = {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};

		try {
			if (admin.manager_id === 1) {
				if (`${manager_id}` != 1) {
					const url = `${baseDomain}/admin/${manager_id}`;

					const response = await fetch(url, options);

					const result = await response.json();

					if (response.ok) {
						alert(`Admin ${manager_id} deleted`);

						const updatedAdmins = admins.filter(admin => !(admin.manager_id === manager_id));

						setAdmins(updatedAdmins);
					} else {
						console.error('Delete failed:', result.message);
					}
				} else {
					alert(`manager_id ${manager_id} can not be deleted`);
					throw new Error('You cannot delet manager_id = 1.');
				}
			} else {
				alert('Just manager_id=1 have permission to do that!!! You do not have permission for this action!!!!!!');
			}
		} catch (error) {
			console.error('Error:', error);
			alert(`Admin ${manager_id} can not be deleted`);
		}
	}

	return (
		<>
			<div className='bt_space'>
				<button onClick={handleDeleteSubmit} className='button_red'>
					Delete Booking
				</button>
			</div>
		</>
	);
}

export default AdminDelete;
