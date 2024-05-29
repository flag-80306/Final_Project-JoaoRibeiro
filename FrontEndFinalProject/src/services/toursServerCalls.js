const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

async function getAllTours(limit = 3, offset = 0) {
	const url = `${baseDomain}/tours?limit=${limit}&offset=${offset}`;
	const response = await fetch(url);
	if (response.ok) {
		const result = await response.json();

		return result;
	} else {
		throw new Error('Failed to fetch tours');
	}
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
