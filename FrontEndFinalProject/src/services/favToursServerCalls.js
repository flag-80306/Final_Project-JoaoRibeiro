const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

async function getAllFavClientTours() {
	const url = `${baseDomain}/favourite_tours/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

async function getFavToursByClientID(client_id) {
	if (!client_id) {
		console.error('Client ID is undefined');
		return null;
	}
	const url = `${baseDomain}/favourite_tours/${client_id}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

async function getFavToursByClientID(client_id) {
	if (!client_id) {
		console.error('Client ID is undefined');
		return null;
	}
	const url = `${baseDomain}/favourite_tours/${client_id}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export default {
	getAllFavClientTours,
	getFavToursByClientID,
};
