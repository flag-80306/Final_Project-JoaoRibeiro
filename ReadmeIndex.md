# Note App BE

This is the main file for the Node.js application. It sets up and starts the HTTP server and defines the API endpoints.

## Dependencies

The application requires Node.js and the `dotenv` package to configure environment variables.

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
```

## Express Configuration

Express is used as the web framework to create the HTTP server.

```javascript
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
```

## Route Definitions

The application defines several routes for different API resources.

```javascript
const adminRouter = require('./router/adminLoginRouter');
const tourRouter = require('./router/tourRouter');
const guideRouter = require('./router/guideRouter');
const clientRouter = require('./router/clientRouter');
const bookingRouter = require('./router/bookingRouter');
const favouriteTourRouter = require('./router/favouriteTourRouter');
const tourGuideRouter = require('./router/tourGuideRouter');
const rateTourRouter = require('./router/rateTourRouter');
```

## Route Configuration

The routes are configured using the `app.use()` middleware.

```javascript
app.get('/', rootController.getRoot);
app.use('/admin', adminRouter);
app.use('/tours', tourRouter);
app.use('/guides', guideRouter);
app.use('/clients', clientRouter);
app.use('/bookings', bookingRouter);
app.use('/tour_guide', tourGuideRouter);
app.use('/favourite_tours', favouriteTourRouter);
app.use('/rate', rateTourRouter);
```

# Project Documentation

Welcome to the project documentation! Here you will find information about the structure, functionality, and usage of the project.

- [Index](ReadmeIndex.md): Overview of the project and server configuration.
- [Admin Login](ReadmeAdmin.md): Documentation about administrator authentication.
- [Tour Routes](ReadmeTours.md): Information about routes related to tours.
- [Guide Routes](ReadmeGuides.md): Description of routes related to guides.
- [Client Routes](ReadmeClients.md): Documentation of routes related to clients.
- [Booking Routes](ReadmeBookings.md): Description of routes related to bookings.
- [Favorite Routes](ReadmeFavTours.md): Information about routes related to client favorites.
- [Tour Guide Routes](ReadmeTourGuide.md): Description of routes related to tour guides.
- [Rate Routes](ReadmeRate.md): Documentation of routes related to tour ratings.
