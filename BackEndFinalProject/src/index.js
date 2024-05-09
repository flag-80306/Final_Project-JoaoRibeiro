require('dotenv').config();

const express = require('express');
const cors = require('cors');
const tourRouter = require('./router/tourRouter');
const guideRouter = require('./router/guideRouter');
const clientRouter = require('./router/clientRouter');
const bookingRouter = require('./router/bookingRouter');
const reviewRouter = require('./router/reviewRouter');
const appController = require('./controllers/rootController');

const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', appController.getRoot);
app.use('/tours', tourRouter);
app.use('/guides', guideRouter);
app.use('/clients', clientRouter);
app.use('/bookings', bookingRouter);
app.use('/reviews', reviewRouter);

app.listen(port, function () {
	console.log(`Ready for final project? YES, Listening on port ${port}`);
});
