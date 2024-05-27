const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

async function getAllToursGuides() {
	const url = `${baseDomain}/tour_guide/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

async function getTourGuideByID(tour_id) {
	if (!tour_id) {
		console.error('Tour ID is undefined');
		return null;
	}
	const url = `${baseDomain}/tour_guide/${tour_id}`;

	const response = await fetch(url);

	const result = await response.json();
	return result;
}

export default {
	getAllToursGuides,
	getTourGuideByID,
};
