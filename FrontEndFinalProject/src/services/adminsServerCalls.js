const baseDomain = 'http://localhost:3000';

async function getAllAdmins() {
	const url = `${baseDomain}/admin/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

async function getManagerByID(tour_id) {
	if (!tour_id) {
		console.error('Admin ID is undefined');
		return null;
	}
	const url = `${baseDomain}/admin/${admin_id}`;

	const response = await fetch(url);

	const result = await response.json();
	return result;
}

export default {
	getAllAdmins,
	getManagerByID,
};
