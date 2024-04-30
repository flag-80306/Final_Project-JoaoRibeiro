const connection = require('../db/connection');

async function getReviewsFromDatabase() {
	const sql = `SELECT * FROM reviews`;

	const response = await connection.promise().query(sql);

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
	getReviewsFromDatabase,
	getReviewByIDFromDatabase,
	insertNewReviewToDatabase,
	updateReviewFromDatabase,
	deleteReviewFromDatabase,
};
