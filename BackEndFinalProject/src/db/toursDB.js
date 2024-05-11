const connection = require('./connectionDB');

async function getToursFromDatabase() {
	// const sql = `
	// SELECT
	// tours.*, guides.guide_name, guides.picture
	// FROM
	// tours
	// INNER JOIN
	// tours_guides
	// ON
	// tours.tour_id = tours_guides.tour_id
	// INNER JOIN
	// guides
	// ON
	// tours_guides.guides_id = guides.guide_id
	// ORDER BY
	// tours.tour_id ASC
	// `;

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
	tours_guides.guides_id = guides.guide_id
	GROUP BY
	tours.tour_name`;

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
	tours_guides.guides_id = guides.guide_id
	WHERE
	tours.tour_id = ?
	GROUP BY
	tours.tour_name`;

	// const sql = `SELECT
	// tours.*, guides.guide_name, guides.picture
	// FROM
	// tours
	// INNER JOIN
	// tours_guides
	// ON
	// tours.tour_id = tours_guides.tour_id
	// INNER JOIN
	// guides
	// ON
	// tours_guides.guides_id = guides.guide_id
	// WHERE
	// tours.tour_id = ?
	// ORDER BY
	// tours.tour_id ASC`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	// const tour = [result[0], result[1], result[2]];

	return result;
}

async function insertNewTourToDatabase(tour) {
	const sql = 'INSERT INTO tours VALUES (NULL, ?, ?, ?, ?, ?, ?, NULL, ?, ?, NULL, NULL) ';
	const params = [tour.name, tour.location, tour.latitude, tour.longitude, tour.description, tour.duration, tour.price_person, tour.images];

	const response = await connection.promise().query(sql, params);

	return response;
}

async function updateTourFromDatabase(tour, id) {
	const sql = 'UPDATE tours SET tour_name = ?, location = ?, latitude = ?, longitude = ?, description = ?, duration = ?, price_person = ?, images = ? WHERE tour_id = ? ';
	//Será que devo acrescentar campos que são NULL?
	const params = [tour.name, tour.location, tour.latitude, tour.longitude, tour.description, tour.duration, tour.price_person, tour.images, id];

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
