const validator = require('validator');
const bookingsDB = require('../db/bookingsDB');
const jwtService = require('../services/jwtService');

async function getAllBookings(req, res) {
	const bookings = await bookingsDB.getBookingsFromDatabase();
	res.json(bookings);
}

async function getBookingByID(req, res) {
	const booking = await bookingsDB.getBookingByIDFromDatabase(req.params.id);
	res.json(booking);
}
async function getBookingWithClientID(req, res) {
	const { authorization } = req.headers;
	console.log(authorization);
	const token = authorization.split(' ')[1];
	console.log(token);

	const result = jwtService.verifyToken(token);
	if (!result) {
		res.status(400).json({
			status: 'error',
			message: 'Invalid token',
		});
		return;
	}

	const booking = await bookingsDB.getBookingWithClientIDFromDatabase(result.userID);

	console.log(booking);
	res.json(booking);
}
async function addNewBooking(req, res) {
	const { tour_id, guide_id, client_id, people, final_price, booking_date } = req.body;

	if (validator.isEmpty(tour_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const booking = {
		tour_id,
		guide_id,
		client_id,
		people,
		final_price,
		booking_date,
	};

	try {
		const result = await bookingsDB.insertNewBookingToDatabase(booking);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function editBooking(req, res) {
	const id = req.params.id;
	const { tour_id, guide_id, client_id, people, final_price, booking_date } = req.body;

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(tour_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const booking = {
		tour_id,
		guide_id,
		client_id,
		people,
		final_price,
		booking_date,
	};

	try {
		const result = await bookingsDB.updateBookingFromDatabase(booking, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteBooking(req, res) {
	const id = req.params.id;
	try {
		const result = await bookingsDB.deleteBookingFromDatabase(id);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getAllBookings,
	getBookingByID,
	getBookingWithClientID,
	addNewBooking,
	editBooking,
	deleteBooking,
};
