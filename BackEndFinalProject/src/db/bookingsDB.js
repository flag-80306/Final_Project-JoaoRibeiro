const connection = require('./connectionDB');
const favouriteTourDB = require('../db/favouriteTourDB');

async function getBookingsFromDatabase() {
	const sql = `SELECT bookings.booking_id, tours.tour_name, tours.tour_id, clients.client_name, bookings.client_id, bookings.people, bookings.final_price, bookings.booking_date, guides.guide_name, guides.guide_id FROM bookings INNER JOIN clients ON bookings.client_id = clients.client_id INNER JOIN tours ON bookings.tour_id = tours.tour_id INNER JOIN guides ON bookings.guide_id = guides.guide_id GROUP BY
	bookings.booking_id`;

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}

async function getBookingByIDFromDatabase(id) {
	// const sql = `SELECT bookings.booking_id, tours.tour_name, tours.tour_id, clients.client_name, bookings.client_id, bookings.people, bookings.final_price, bookings.booking_date, guides.guide_name, guides.guide_id, rating.rate FROM bookings INNER JOIN clients ON bookings.client_id = clients.client_id INNER JOIN tours ON bookings.tour_id = tours.tour_id INNER JOIN guides ON bookings.guide_id = guides.guide_id INNER JOIN rating ON bookings.booking_id = rating.booking_id WHERE bookings.booking_id = ?`;

	const sql = `SELECT bookings.booking_id, tours.tour_name, tours.tour_id, clients.client_name, bookings.client_id, bookings.people, bookings.final_price, bookings.booking_date, guides.guide_name, guides.guide_id FROM bookings INNER JOIN clients ON bookings.client_id = clients.client_id INNER JOIN tours ON bookings.tour_id = tours.tour_id INNER JOIN guides ON bookings.guide_id = guides.guide_id WHERE bookings.booking_id = ?`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const booking = result[0];

	return booking;
}

async function getBookingsWithClientIDFromDatabase(clientId) {
	console.log('clilcilcil', clientId);
	const sql = `SELECT
	bookings.booking_id, tours.tour_name, tours.tour_id, clients.client_name, bookings.people, bookings.final_price, bookings.client_id, bookings.booking_date, guides.guide_name, guides.guide_id, rating.rate FROM bookings
	INNER JOIN tours ON bookings.tour_id = tours.tour_id
	INNER JOIN guides ON bookings.guide_id = guides.guide_id
	INNER JOIN clients ON bookings.client_id = clients.client_id
	LEFT JOIN rating ON bookings.booking_id = rating.booking_id
	WHERE bookings.client_id = ? ORDER BY bookings.booking_date ASC`;

	// const sql = `SELECT
	// bookings.booking_id, tours.tour_name, tours.tour_id, clients.client_name, bookings.people, bookings.final_price, bookings.client_id, bookings.booking_date, guides.guide_name, guides.guide_id FROM bookings
	// INNER JOIN tours ON bookings.tour_id = tours.tour_id
	// INNER JOIN guides ON bookings.guide_id = guides.guide_id
	// INNER JOIN clients ON bookings.client_id = clients.client_id
	// WHERE bookings.client_id = ? ORDER BY bookings.booking_date DESC`;

	const params = [clientId];

	const [response] = await connection.promise().query(sql, params);
	// const banana = response[1];
	// console.log('banana', result);

	return response;
}

async function insertNewBookingToDatabase(booking) {
	const params = [booking.tour_id, booking.guide_id, booking.client_id, booking.people, booking.final_price, booking.booking_date];
	const verifyFavClientTour = await favouriteTourDB.getFavouriteTourByClientIDFromDatabase(booking.client_id, booking.tour_id);
	const deleteFavClientToursql = 'DELETE FROM favourite_tours WHERE client_id = ? AND tour_id = ?';

	const insertBookingsql = 'INSERT INTO bookings VALUES (NULL, ?, ?, ?, ?, ?, ?, NULL, NULL) ';

	await connection.promise().query('START TRANSACTION');

	try {
		if (verifyFavClientTour.length > 0) {
			await connection.promise().query(deleteFavClientToursql, [booking.client_id, booking.tour_id]);
		}

		const [result] = await connection.promise().query(insertBookingsql, params);
		await connection.promise().query('COMMIT');
		console.log(result);
		const newBooking = getBookingByIDFromDatabase(result.insertId);
		return { result, newBooking };
	} catch (error) {
		await connection.promise().query('ROLLBACK');
		throw error;
	}
}

async function updateBookingFromDatabase(booking, id) {
	const sql = 'UPDATE bookings SET tour_id = ?, guide_id = ?, client_id = ?, people = ?,final_price = ?, booking_date = ? WHERE booking_id = ? ';

	const params = [booking.tour_id, booking.guide_id, booking.client_id, booking.people, booking.final_price, booking.booking_date, id];

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
	getBookingsWithClientIDFromDatabase,
	insertNewBookingToDatabase,
	updateBookingFromDatabase,
	deleteBookingFromDatabase,
};
