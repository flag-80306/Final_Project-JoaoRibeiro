const connection = require('./connectionDB');

async function getRateCount() {
	try {
		const [result] = await connection.promise().query(`
            SELECT COUNT(*) AS totalReviews FROM rating
        `);
		return result[0];
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong!');
	}
}

async function getAllRateLO(limit = 5, offset = 0) {
	const params = [limit, offset];
	const sql = `SELECT * FROM rating LIMIT ? OFFSET ?`;
	try {
		const result = await connection.promise().query(sql, params);
		return result;
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong!');
	}
}

async function getRateFromDatabase() {
	const sql = `SELECT * FROM rating`;

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}
async function getAllToursIDRateFromDatabase(id) {
	const sql = `SELECT * FROM rating WHERE tour_id = ?`;
	const params = [id];
	const response = await connection.promise().query(sql, params);
	const result = response[0];
	return result;
}
async function getAllClientIDRateFromDatabase(id) {
	const sql = `SELECT * FROM rating WHERE client_id = ?`;
	const params = [id];
	const response = await connection.promise().query(sql, params);

	const result = response[0];
	return result;
}

async function getRateByIDFromDatabase(id) {
	const sql = `SELECT * FROM rating WHERE id = ?;`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const review = result[0];

	return review;
}
async function getBookingIDRateFromDatabase(id) {
	const sql = `SELECT * FROM rating WHERE booking_id = ?;`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const review = result[0];

	return review;
}

async function insertNewRateToDatabase(rate) {
	const sql = 'INSERT INTO rating VALUES (NULL, ?, ?, ?, ?, NULL, NULL) ';
	const params = [rate.tour_id, rate.client_id, rate.rate, rate.booking_id];

	const [response] = await connection.promise().query(sql, params);

	return response;
}

async function updateRateFromDatabase(rate, id) {
	const sql = 'UPDATE rating SET tour_id = ?, client_id = ?, rate = ?, booking_id = ? WHERE id = ?';

	const params = [rate.tour_id, rate.client_id, rate.rate, rate.booking_id, id];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function deleteRateFromDatabase(id) {
	const sql = 'DELETE FROM rating WHERE id = ?';

	const [response] = await connection.promise().query(sql, id);
	console.log('r', response);
	return response;
}

module.exports = {
	getRateCount,
	getAllRateLO,
	getAllToursIDRateFromDatabase,
	getAllClientIDRateFromDatabase,
	getRateFromDatabase,
	getBookingIDRateFromDatabase,
	getRateByIDFromDatabase,
	insertNewRateToDatabase,
	updateRateFromDatabase,
	deleteRateFromDatabase,
};
