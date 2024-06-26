const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
async function getAllRates() {
	const url = `${baseDomain}/rate/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
async function getRateByID(id) {
	if (!id) {
		console.error('Rate ID is undefined');
		return null;
	}
	const url = `${baseDomain}/rate/${id}`;

	const response = await fetch(url);

	const result = await response.json();
	return result;
}
async function getRateByTourID(tour_id) {
	if (!tour_id) {
		console.error('Tour ID is undefined');
		return null;
	}
	const url = `${baseDomain}/rate/tour/${tour_id}`;

	const response = await fetch(url);

	const result = await response.json();
	return result;
}
async function getRateByClientID(client_id) {
	if (!client_id) {
		console.error('Client ID is undefined');
		return null;
	}
	const url = `${baseDomain}/rate/client/${client_id}`;

	const token = localStorage.getItem('token');

	try {
		const response = await fetch(url, {
			headers: { authorization: `Bearer ${token}` },
		});
		const result = response.json();
		// console.log('result call', result);
		return result;
	} catch (error) {
		console.error('Error fetching client bookings:', error);
		return null;
	}
}
async function getRateByBookingID(booking_id) {
	if (!booking_id) {
		console.error('Booking ID is undefined');
		return null;
	}
	const url = `${baseDomain}/rate/booking/${booking_id}`;

	const response = await fetch(url);

	const result = await response.json();
	return result;
}

export default {
	getAllRates,
	getRateByID,
	getRateByTourID,
	getRateByClientID,
	getRateByBookingID,
};
