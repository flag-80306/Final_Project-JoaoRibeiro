const validator = require('validator');
const reviewsDB = require('../db/reviewsDB');

async function getAllReviews(req, res) {
	const reviews = await reviewsDB.getReviewsFromDatabase();
	res.json(reviews);
}
// getAllReviewsLO e getReviewsCount nao definidos
async function getReviewByClientID(req, res) {
	const review = await reviewsDB.getAllClientIDReviewsFromDatabase(req.params.id);
	res.json(review);
}
async function getReviewByTourID(req, res) {
	const review = await reviewsDB.getAllToursIDReviewsFromDatabase(req.params.id);
	res.json(review);
}
async function getReviewByReviewID(req, res) {
	const review = await reviewsDB.getReviewByIDFromDatabase(req.params.id);
	res.json(review);
}

async function addNewReview(req, res) {
	const { booking_id, comment, stars } = req.body;

	if (validator.isEmpty(booking_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const review = {
		booking_id,
		comment,
		stars,
	};

	async function postNewReview(req, res) {
		const { tour_name, review } = req.body;

		if (validator.isEmpty(tour_name)) {
			res.status(400).json('Invalid Payload');
			return;
		}

		const rating = {
			tour_name,
			review,
		};

		try {
			const result = await toursDB.insertNewReviewToDatabase(rating);
			res.json(result);
		} catch (error) {
			console.log(error);
			res.status(500).send('There was an error');
		}
	}

	try {
		const result = await reviewsDB.insertNewReviewToDatabase(review);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function editReview(req, res) {
	const id = req.params.id;
	const { booking_id, comment, stars } = req.body;

	if (!validator.isNumeric(id)) {
		res.status(400).json('Invalid Request');
		return;
	}

	if (validator.isEmpty(booking_id)) {
		res.status(400).json('Invalid Payload');
		return;
	}

	const review = {
		booking_id,
		comment,
		stars,
	};

	try {
		const result = await reviewsDB.updateReviewFromDatabase(review, id);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}

async function deleteReview(req, res) {
	const id = req.params.id;
	try {
		const result = await reviewsDB.deleteReviewFromDatabase(id);
		res.json(result[0]);
	} catch (error) {
		console.log(error);
		res.status(500).send('There was an error');
	}
}
module.exports = {
	getAllReviews,
	getReviewByClientID,
	getReviewByTourID,
	getReviewByReviewID,
	addNewReview,
	editReview,
	deleteReview,
};
