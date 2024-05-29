const connection = require('./connectionDB');

async function getReviewsCount() {
	try {
		const [result] = await connection.promise().query(`
            SELECT COUNT(*) AS totalReviews FROM users
        `);
		return result[0];
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong!');
	}
}

async function getAllReviewsLO(limit = 5, offset = 0) {
	const params = [limit, offset];
	const sql = `SELECT * FROM reviews LIMIT ? OFFSET ?`;
	try {
		const result = await connection.promise().query(sql, params);
		return result;
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong!');
	}
}

async function getReviewsFromDatabase() {
	const sql = `SELECT * FROM reviews`;

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}
async function getAllToursIDReviewsFromDatabase(id) {
	const sql = `SELECT * FROM tours WHERE tour_id = ?`;
	const params = [id];
	const response = await connection.promise().query(sql, params);
	const result = response[0];
	return result;
}
async function getAllClientIDReviewsFromDatabase(id) {
	const sql = `SELECT * FROM tours WHERE client_id = ?`;
	const params = [id];
	const response = await connection.promise().query(sql, params);

	const result = response[0];
	return result;
}

async function getReviewByIDFromDatabase(id) {
	const sql = `SELECT * FROM reviews WHERE review_id = ?;`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const review = result[0];

	return review;
}
//to be continued here
async function insertNewReviewToDatabase(review) {
	const sql = 'INSERT INTO reviews VALUES (NULL, ?, ?, ?, NULL, NULL) ';
	const params = [review.booking_id, review.comment, review.stars];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function updateReviewFromDatabase(review, id) {
	const sql = 'UPDATE reviews SET booking_id = ?, comment = ?, stars = ? WHERE review_id = ?';

	const params = [review.booking_id, review.comment, review.stars, id];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function deleteReviewFromDatabase(id) {
	const sql = 'DELETE FROM reviews WHERE review_id = ?';

	const response = await connection.promise().query(sql, id);

	return response;
}

module.exports = {
	getReviewsCount,
	getAllReviewsLO,
	getAllToursIDReviewsFromDatabase,
	getAllClientIDReviewsFromDatabase,
	getReviewsFromDatabase,
	getReviewByIDFromDatabase,
	insertNewReviewToDatabase,
	updateReviewFromDatabase,
	deleteReviewFromDatabase,
};
