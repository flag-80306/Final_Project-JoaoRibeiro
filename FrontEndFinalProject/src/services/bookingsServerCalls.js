const baseDomain = import.meta.env.VITE_BASE_DOMAIN;
async function getAllBookings() {
	const url = `${baseDomain}/bookings/`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
async function getBookingByID(booking_id) {
	if (!booking_id) {
		console.error('Booking ID is undefined');
		return null;
	}
	const url = `${baseDomain}/bookings/${booking_id}`;

	const response = await fetch(url);

	const result = await response.json();
	return result;
}
async function getClientBookingByID(client_id) {
	if (!client_id) {
		console.error('Client ID is undefined');
		return null;
	}

	const url = `${baseDomain}/bookings/client/${client_id}`;

	const token = localStorage.getItem('token');

	try {
		const response = await fetch(url, {
			headers: { authorization: `Bearer ${token}` },
		});

		if (!response.ok) {
			console.error('Failed to fetch client bookings:', response.statusText);
			return null;
		}
		const result = response.json();

		return result;
	} catch (error) {
		console.error('Error fetching client bookings:', error);
		return null;
	}
}
export default {
	getAllBookings,
	getBookingByID,
	getClientBookingByID,
};
