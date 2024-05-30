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

async function getFavToursWithClientTourID(clientFavTour) {
	if (!clientFavTour.clientID || !clientFavTour.tour_id) {
		console.error('Client / tour ID is undefined');
		return null;
	}
	const clientID = clientFavTour.clientID;

	const tourID = clientFavTour.tour_id;

	const url = `${baseDomain}/favourite_tours/${clientID}/${tourID}`;
	const response = await fetch(url);

	const result = await response.json();
	return result;
}

export default {
	getAllFavClientTours,
	getFavToursByClientID,
	getFavToursWithClientTourID,
};
