const connection = require('./connectionDB');

async function getFavouriteClientToursFromDatabase() {
	const sql = `SELECT
	favourite_tours.*,tours.tour_name, clients.client_name
	FROM
	favourite_tours
	INNER JOIN
	tours
	ON
	favourite_tours.tour_id = tours.tour_id
	INNER JOIN
	clients
	ON
	clients.client_id = favourite_tours.client_id;`;

	const response = await connection.promise().query(sql);
	const result = response[0];
	return result;
}

async function getFavouriteTourByClientIDFromDatabase(id) {
	const sql = `SELECT
	favourite_tours.*,tours.tour_name, clients.client_name
	FROM
	favourite_tours
	INNER JOIN
	tours
	ON
	favourite_tours.tour_id = tours.tour_id
	INNER JOIN
	clients
	ON
	clients.client_id = favourite_tours.client_id
	WHERE
	favourite_tours.client_id = ?`;

	const params = [id];

	const response = await connection.promise().query(sql, params);
	const result = response[0];

	return result;
}

async function insertNewFavouriteClientTourToDatabase(favTour) {
	const sql = 'INSERT INTO favourite_tours VALUES (?, ?) ';
	const params = [favTour.client_id, favTour.tour_id];
	try {
		const [result] = await connection.promise().query(sql, params);
		console.log(result);
		// const newFavTour = getFavouriteTourByClientIDFromDatabase(result);
		// console.log('fav', newFavTour);
		// return newFavTour;
		return result;
	} catch (error) {
		throw error;
	}
}

async function updateFavouriteClientTourFromDatabase(newTour_id, [client_id, tour_id]) {
	const sql = 'UPDATE favourite_tours SET tour_id = ? WHERE client_id = ? AND tour_id = ?';
	const params = [newTour_id, client_id, tour_id];
	console.log('params', params);
	const response = await connection.promise().query(sql, params);
	console.log('response', response);
	return response;
}

async function deleteFavouriteClientTourFromDatabase(client_id, tour_id) {
	const sql = 'DELETE FROM favourite_tours WHERE client_id = ? AND tour_id = ?';
	const response = await connection.promise().query(sql, [client_id, tour_id]);

	return response;
}

module.exports = {
	getFavouriteClientToursFromDatabase,
	getFavouriteTourByClientIDFromDatabase,
	insertNewFavouriteClientTourToDatabase,
	updateFavouriteClientTourFromDatabase,
	deleteFavouriteClientTourFromDatabase,
};
