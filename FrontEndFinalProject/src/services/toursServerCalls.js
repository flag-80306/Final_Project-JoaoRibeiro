const baseDomain = 'http://localhost:3000';

async function getAllTours() {
	const url = `${baseDomain}/tours/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

// async function getTourByID(tour) {
// 	if (!tour) {
// 		console.error('Tour ID is undefined');
// 		return null;
// 	}
// 	const url = `${baseDomain}/tours/${tour}`;

// 	const response = await fetch(url);

// 	const result = await response.json();
// 	return result; // Deve ser um objeto, não um array
// }

export default {
	getAllTours,
	// getTourByID,
};
