const baseDomain = 'http://localhost:3000';

async function getAllTours() {
	const url = `${baseDomain}/tours/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

async function getTourByID(tour_id) {
	if (!tour_id) {
		console.error('Tour ID is undefined');
		return null;
	}
	const url = `${baseDomain}/tours/${tour_id}`;

	const response = await fetch(url);

	const result = await response.json();
	return result;
}

export default {
	getAllTours,
	getTourByID,
};
