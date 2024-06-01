const connection = require('./connectionDB');

async function getAverageTourRate(tour_id) {
	try {
		const [result] = await connection.promise().query(
			`
            SELECT AVG(rate) AS averageRate FROM rating
            WHERE tour_id = ?`,
			[tour_id],
		);
		return result[0].averageRate;
	} catch (error) {
		console.error('Error executing query:', error);
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
async function getRateByIDFromDatabase(id) {
	const sql = `SELECT * FROM rating WHERE id = ?;`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const review = result[0];

	return review;
}
async function getAllClientIDRateFromDatabase(id) {
	const sql = `SELECT * FROM rating WHERE client_id = ?`;
	const params = [id];
	const response = await connection.promise().query(sql, params);

	const result = response[0];
	return result;
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
	const newRate = getRateByIDFromDatabase(response.insertId);
	return newRate;
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

	return response;
}

module.exports = {
	getAverageTourRate,
	getAllToursIDRateFromDatabase,
	getAllClientIDRateFromDatabase,
	getRateFromDatabase,
	getBookingIDRateFromDatabase,
	getRateByIDFromDatabase,
	insertNewRateToDatabase,
	updateRateFromDatabase,
	deleteRateFromDatabase,
};
