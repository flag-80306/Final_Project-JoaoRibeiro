const connection = require('../db/connection');

async function getGuidesFromDatabase() {
	const sql = 'SELECT * FROM guides';

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}

async function getGuideByIDFromDatabase(id) {
	const sql = 'SELECT * FROM guides WHERE guide_id = ?';

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const guide = result[0];
	return guide;
}

async function insertNewGuideToDatabase(guide) {
	const sql = 'INSERT INTO guides VALUES (NULL, ?, ?, ?, ?, NULL, NULL) ';
	const params = [guide.guide_username, guide.password, guide.guide_name, guide.picture];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function updateGuideFromDatabase(guide, id) {
	const sql = 'UPDATE guides SET guide_username = ?, password = ?, guide_name = ?, picture = ? WHERE guide_id = ?';

	const params = [guide.guide_username, guide.password, guide.guide_name, guide.picture, id];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function deleteGuideFromDatabase(id) {
	const sql = 'DELETE FROM guides WHERE guide_id = ?';

	const response = await connection.promise().query(sql, id);

	return response;
}

module.exports = {
	getGuidesFromDatabase,
	getGuideByIDFromDatabase,
	insertNewGuideToDatabase,
	updateGuideFromDatabase,
	deleteGuideFromDatabase,
};