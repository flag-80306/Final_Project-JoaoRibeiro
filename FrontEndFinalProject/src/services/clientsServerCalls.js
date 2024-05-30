const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

async function getAllClients() {
	const url = `${baseDomain}/clients/`;
	const token = localStorage.getItem('token');
	const response = await fetch(url, {
		headers: { authorization: `Bearer ${token}` },
	});

	const result = await response.json();
	return result;
}

async function getClientByID(client_id) {
	if (!client_id) {
		console.error('Client ID is undefined');
		return null;
	}
	const url = `${baseDomain}/clients/${client_id}`;
	const token = localStorage.getItem('token');
	const response = await fetch(url, {
		headers: { authorization: `Bearer ${token}` },
	});

	const result = response.json();

	return result;
}
async function deleteClientInfo(client_id) {
	if (!client_id) {
		console.error('Client ID is undefined');
		return null;
	}
	const url = `${baseDomain}/clients/${client_id}`;
	const token = localStorage.getItem('token');
	const response = await fetch(url, {
		headers: { authorization: `Bearer ${token}` },
	});
	const result = response.json();

	return result;
}
export default {
	getAllClients,
	getClientByID,
	deleteClientInfo,
};
