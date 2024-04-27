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

async function insertNewTourToDatabase(tour) {
	const sql = 'INSERT INTO tours VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, NULL, NULL) ';
	const params = [tour.name, tour.location, tour.latitude, tour.longitude, tour.description, tour.duration, tour.price_person, tour.guide_id, tour.images, id];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function updateTourFromDatabase(tour, id) {
	const sql = 'UPDATE tours SET name = ?, location = ?, latitude = ?, longitude = ?, description = ?, duration = ?, price_person = ?, guide_id = ?, images = ? WHERE tour_id = ? ';
	//Será que devo acrescentar campos que são NULL?
	const params = [tour.name, tour.location, tour.latitude, tour.longitude, tour.description, tour.duration, tour.price_person, tour.guide_id, tour.images, id];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function deleteTourFromDatabase(id) {
	const sql = 'DELETE FROM tours WHERE tour_id = ?';

	const response = await connection.promise().query(sql, id);

	return response;
}

module.exports = {
	getToursFromDatabase,
	getTourByIDFromDatabase,
	insertNewTourToDatabase,
	updateTourFromDatabase,
	deleteTourFromDatabase,
};
