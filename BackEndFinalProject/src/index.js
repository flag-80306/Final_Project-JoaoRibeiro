require('dotenv').config();

const express = require('express');
const cors = require('cors');
const adminRouter = require('./router/adminLoginRouter');
const tourRouter = require('./router/tourRouter');
const guideRouter = require('./router/guideRouter');
const clientRouter = require('./router/clientRouter');
const bookingRouter = require('./router/bookingRouter');
const reviewRouter = require('./router/reviewRouter');
const rootController = require('./controllers/rootController');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', rootController.getRoot);
app.use('/admin', adminRouter);
app.use('/tours', tourRouter);
app.use('/guides', guideRouter);
app.use('/clients', clientRouter);
app.use('/bookings', bookingRouter);
app.use('/reviews', reviewRouter);

app.listen(port, function () {
	console.log(`Ready for final project? YES, Listening on port ${port}`);
});
