const connection = require('../db/connection');

async function getBookingsFromDatabase() {
	const sql = `SELECT bookings.booking_id, tours.tour_name, clients.client_name, bookings.final_price, bookings.booking_date, guides.guide_name FROM bookings INNER JOIN clients ON bookings.client_id = clients.client_id INNER JOIN tours ON bookings.tour_id = tours.tour_id INNER JOIN guides ON bookings.guide_id = guides.guide_id`;

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}

async function getBookingByIDFromDatabase(id) {
	const sql = `SELECT bookings.booking_id, tours.tour_name, clients.client_name, bookings.final_price, bookings.booking_date, guides.guide_name FROM bookings INNER JOIN clients ON bookings.client_id = clients.client_id INNER JOIN tours ON bookings.tour_id = tours.tour_id INNER JOIN guides ON bookings.guide_id = guides.guide_id WHERE booking_id = ?`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const booking = result[0];

	return booking;
}

async function insertNewBookingToDatabase(booking) {
	const sql = 'INSERT INTO bookings VALUES (NULL, ?, ?, ?, ?, ?, NULL, NULL) ';
	const params = [booking.tour_id, booking.guide_id, booking.client_id, booking.final_price, booking.booking_date];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function updateBookingFromDatabase(booking, id) {
	const sql = 'UPDATE bookings SET tour_id = ?, guide_id = ?, client_id = ?, final_price = ?, booking_date = ? WHERE booking_id = ? ';

	const params = [booking.tour_id, booking.guide_id, booking.client_id, booking.final_price, booking.booking_date, id];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function deleteBookingFromDatabase(id) {
	const sql = 'DELETE FROM bookings WHERE booking_id = ?';

	const response = await connection.promise().query(sql, id);

	return response;
}

module.exports = {
	getBookingsFromDatabase,
	getBookingByIDFromDatabase,
	insertNewBookingToDatabase,
	updateBookingFromDatabase,
	deleteBookingFromDatabase,
};