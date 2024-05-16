const baseDomain = 'http://localhost:3000';

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
		const result = response.json();
		console.log('response', response);
		console.log('result', result);
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
