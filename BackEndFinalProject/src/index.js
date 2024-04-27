require('dotenv').config();

const express = require('express');
const cors = require('cors');
const tourRouter = require('./router/tourRouter');
const guideRouter = require('./router/guideRouter');
const appController = require('./controllers/tourController');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', appController.getRoot);
app.use('/tours', tourRouter);
app.use('/guides', guideRouter);

app.listen(port, function () {
	console.log(`Ready for final project? YES, Listening on port ${port}`);
});
