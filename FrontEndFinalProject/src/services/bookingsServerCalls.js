const baseDomain = 'http://localhost:3000';

async function getAllBookings() {
	const url = `${baseDomain}/bookings/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export default {
	getAllBookings,
};
