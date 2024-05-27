import React from 'react';
const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

function AdminDelete({ manager_id, admins, setAdmins }) {
	async function handleDeleteSubmit() {
		const adminConfirmed = window.confirm(`Are you sure you want to delete booking ${manager_id}?`);
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
			if (`${manager_id}` != 1) {
				const url = `${baseDomain}/admin/${manager_id}`;

				const response = await fetch(url, options);

				const result = await response.json();

				if (response.ok) {
					console.log(`Admin ${manager_id} deleted`, result);
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
		} catch (error) {
			console.error('Error:', error);
			alert(`Admin ${manager_id} can not be deleted`);
		}
	}

	return (
		<>
			<div className='bt_space'>
				<button onClick={handleDeleteSubmit} className='button'>
					Delete Booking
				</button>
			</div>
		</>
	);
}

export default AdminDelete;
