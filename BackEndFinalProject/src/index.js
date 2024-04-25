require('dotenv').config();

const appController = require('./controllers/tourController');

const express = require('express');

const app = express();
const port = 3000;

app.get('/', appController.getRoot);
app.get('/tours', appController.getAllTours);
app.get('/tours/:id', appController.getTourByID);

app.post('/tours/:id', appController.addNewTour);
app.put('/tours/:id', appController.editTour);
app.delete('/tours/:id', appController.deleteTour);

app.listen(port, function () {
	console.log(`Ready for final project? YES, Listening on port ${port}`);
});
