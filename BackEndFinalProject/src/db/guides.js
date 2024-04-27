const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DE_PASSWORD,
	database: process.env.DB_DATABASE,
});

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
	const sql = 'INSERT INTO guides VALUES (NULL, ?, ?, ?, ?, ?, NULL, NULL) ';
	const params = [guide.username, guide.password, guide.name, guide.tour_id, guide.picture];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function updateGuideFromDatabase(guide, id) {
	const sql = 'UPDATE guides SET username = ?, password = ?, name = ?, tour_id = ?, picture = ? WHERE guide_id = ?';

	const params = [guide.username, guide.password, guide.name, guide.tour_id, guide.picture, id];

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
