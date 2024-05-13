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
	const response = await fetch(url, {
		headers: { authorization: `Bearer ${token}` },
	});
	const result = response.json();
	return result;
}
export default {
	getAllBookings,
	getBookingByID,
	getClientBookingByID,
};
