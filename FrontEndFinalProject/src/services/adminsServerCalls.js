const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

async function getAllAdmins() {
	const url = `${baseDomain}/admin/`;

	const response = await fetch(url);
	const result = await response.json();
	return result;
}

async function getManagerByID(manager_id) {
	if (!manager_id) {
		console.error('Admin ID is undefined');
		return null;
	}

	const url = `${baseDomain}/admin/${manager_id}`;

	const response = await fetch(url);

	const result = await response.json();
	return result;
}

export default {
	getAllAdmins,
	getManagerByID,
};
