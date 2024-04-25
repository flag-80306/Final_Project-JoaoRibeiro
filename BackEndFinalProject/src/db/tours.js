const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DE_PASSWORD,
	database: process.env.DB_DATABASE,
});

async function getToursFromDatabase() {
	const sql = 'SELECT * FROM tours';

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}

async function getTourByIDFromDatabase(id) {
	const sql = 'SELECT * FROM tours WHERE tour_id = ?';

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const tour = result[0];
	return tour;
}

async function insertNewTourToDatabase(id) {
	const sql = 'INSERT INTO tours VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, NULL, NULL) ';
	const params = [id.name, id.location, id.latitude, id.longitude, id.description, id.duration, id.price_person, id.guide_id, id.images];

	const response = await connection.promise().query(sql, params);
	console.log(response);
	return tour;
}

async function getTourBy(id) {
	const sql = 'SELECT * FROM tours WHERE tour_id = ?';

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const tour = result[0];
	return tour;
}

async function getTourByIDe(id) {
	const sql = 'SELECT * FROM tours WHERE tour_id = ?';

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	const tour = result[0];
	return tour;
}

module.exports = {
	getToursFromDatabase,
	getTourByIDFromDatabase,
	insertNewTourToDatabase,
};
