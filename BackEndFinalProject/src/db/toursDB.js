const connection = require('./connectionDB');

async function getToursFromDatabase() {
	const sql = `SELECT
	tours.*,
	GROUP_CONCAT(guides.guide_name SEPARATOR ', ') AS guide_names,
	GROUP_CONCAT(guides.guide_id SEPARATOR ', ') AS guide_id
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
	GROUP_CONCAT(guides.guide_id SEPARATOR ', ') AS guide_id
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
	tours.tour_id = ?`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];
	console.log('response', response);
	return result;
}

// async function insertNewTourToDatabase(tour) {
// 	const sql = 'INSERT INTO tours VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, NULL, ?, NULL, NULL)';
// 	const params = [tour.tour_name, tour.location, tour.latitude, tour.longitude, tour.description, tour.duration, tour.price_person, tour.images];

// 	const [result] = await connection.promise().query(sql, params);
// 	console.log(result.insertId);
// 	const newTour = getTourByIDFromDatabase(result.insertId);
// 	console.log('new', newTour);
// 	return newTour;
// }

async function insertNewTourToDatabase(tour) {
	const insertTourSql = 'INSERT INTO tours VALUES (NULL, ?, ?, ?, ?, ?, NULL, ?, NULL, NULL)';
	const insertGuideSql = 'INSERT INTO tours_guides (tour_id, guide_id) VALUES (?, 4)';
	const params = [tour.tour_name, tour.location, tour.description, tour.duration, tour.price_person, tour.images];

	// Start transaction
	await connection.promise().query('START TRANSACTION');

	try {
		// Insert new tour
		const [result] = await connection.promise().query(insertTourSql, params);
		const newTourId = result.insertId;

		// Insert new tour-guide relation
		await connection.promise().query(insertGuideSql, [newTourId]);

		// Commit transaction
		await connection.promise().query('COMMIT');

		// Get the newly inserted tour
		const [newTour] = await getTourByIDFromDatabase(newTourId);
		console.log('new', newTour);
		return newTour;
	} catch (error) {
		// Rollback transaction in case of error
		await connection.promise().query('ROLLBACK');
		throw error;
	}
}

async function updateTourFromDatabase(tour, id) {
	const sql = 'UPDATE tours SET tour_name = ?, location = ?, description = ?, duration = ?, price_person = ?, images = ? WHERE tour_id = ? ';

	const params = [tour.tour_name, tour.location, tour.description, tour.duration, tour.price_person, tour.images, id];

	const response = await connection.promise().query(sql, params);

	return response;
}

// async function deleteTourFromDatabase(id) {
// 	const sql = 'DELETE FROM tours WHERE tour_id = ?';

// 	const response = await connection.promise().query(sql, id);

// 	return response;
// }

async function deleteTourFromDatabase(id) {
	const deleteTourSql = 'DELETE FROM tours WHERE tour_id = ?';
	const deleteToursGuideSql = 'DELETE FROM tours_guides WHERE tour_id = ?';

	await connection.promise().query('START TRANSACTION');

	try {
		await connection.promise().query(deleteToursGuideSql, [id]);
		const [result] = await connection.promise().query(deleteTourSql, [id]);
		await connection.promise().query('COMMIT');
		return result;
	} catch (error) {
		await connection.promise().query('ROLLBACK');
		throw error;
	}
}

module.exports = {
	getToursFromDatabase,
	getTourByIDFromDatabase,
	insertNewTourToDatabase,
	updateTourFromDatabase,
	deleteTourFromDatabase,
};
