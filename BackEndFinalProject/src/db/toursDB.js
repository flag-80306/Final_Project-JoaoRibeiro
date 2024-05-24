const connection = require('./connectionDB');

async function getToursFromDatabase() {
	const sql = `SELECT
	tours.*,
	GROUP_CONCAT(guides.guide_name SEPARATOR ', ') AS guide_names,
	GROUP_CONCAT(guides.picture SEPARATOR ', ') AS guide_pictures
	FROM
	tours
	INNER JOIN
	tours_guides
	ON
	tours.tour_id = tours_guides.tour_id
	INNER JOIN
	guides
	ON
	tours_guides.guide_id = guides.guide_id
	GROUP BY
	tours.tour_id`;

	const response = await connection.promise().query(sql);

	const result = response[0];
	return result;
}

async function getTourByIDFromDatabase(id) {
	const sql = `SELECT
	tours.*,
	GROUP_CONCAT(guides.guide_name SEPARATOR ', ') AS guide_names,
	GROUP_CONCAT(guides.picture SEPARATOR ', ') AS guide_pictures
	FROM
	tours
	INNER JOIN
	tours_guides
	ON
	tours.tour_id = tours_guides.tour_id
	INNER JOIN
	guides
	ON
	tours_guides.guide_id = guides.guide_id
	WHERE
	tours.tour_id = ?
	GROUP BY
	tours.tour_id`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];

	return result;
}

async function insertNewTourToDatabase(tour) {
	const sql = 'INSERT INTO tours VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, NULL, ?, NULL, NULL) ';
	const params = [tour.tour_name, tour.location, tour.latitude, tour.longitude, tour.description, tour.duration, tour.price_person, tour.images];
	// console.log('params', params);
	const response = await connection.promise().query(sql, params);
	// console.log('response', response);
	return response;
}

async function updateTourFromDatabase(tour, id) {
	const sql = 'UPDATE tours SET tour_name = ?, location = ?, latitude = ?, longitude = ?, description = ?, duration = ?, price_person = ?, images = ? WHERE tour_id = ? ';

	const params = [tour.tour_name, tour.location, tour.latitude, tour.longitude, tour.description, tour.duration, tour.price_person, tour.images, id];

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
