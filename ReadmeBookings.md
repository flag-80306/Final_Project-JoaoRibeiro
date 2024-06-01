# General Info

This app provides a REST-API for managing bookings, including listing all bookings, retrieving a booking by ID, retrieving bookings by client ID, adding a new booking, editing a booking, and deleting a booking.

# Endpoints

## Overview

This app uses the following endpoints and methods:

[`GET /bookings`](#Get_all_bookings)

[`GET /bookings/:id`](#Get_booking_by_ID)

[`GET /bookings/client/:id`](#Get_bookings_with_client_ID)

[`POST /bookings/register`](#Add_new_booking)

[`PUT /bookings/:id`](#Edit_booking)

[`DELETE /bookings/:id`](#Delete_booking)

## Get_all_bookings

### Request

`GET /bookings`

### Response

> Gets all the Bookings in the Database and returns array of objects.

Response Payload example:

```json
[
    {
        "booking_id": ObjectId,
        "tour_name": string,
        "tour_id": number,
        "client_name": string,
        "client_id": ObjectId,
        "people": number,
        "final_price": number,
        "booking_date": string,
        "guide_name": string,
        "guide_id": ObjectId
    },
    ...
]
```

## Get_booking_by_ID

### Request

`GET /bookings/:id`

### Response

> Gets a single Booking based on the database Id and returns a one object and it will include one extra row with the average rate of the tour.

Response Payload example:

```json
{
	"booking_id": ObjectId,
    "tour_name": string,
    "tour_id": number,
    "client_name": string,
    "client_id": ObjectId,
    "people": number,
    "final_price": number,
    "booking_date": string,
    "guide_name": string,
    "guide_id": ObjectId,
	"rate": number
}
```

## Get_bookings_with_client_ID

### Request

`GET /bookings/client/:id`

### Headers

```json
{
	"Authorization": "Bearer <JWT token>"
}
```

### Response

> Gets all the Bookings for one client ID in the Database and returns array of objects.

Response Payload example:

```json
[
    {
        "booking_id": ObjectId,
        "tour_name": string,
        "tour_id": number,
        "client_name": string,
        "client_id": ObjectId,
        "people": number,
        "final_price": number,
        "booking_date": string,
        "guide_name": string,
        "guide_id": ObjectId,
	    "rate": number
    },
    ...
]
```

## Add_new_booking

### Request

`POST /bookings/register`

> Inserts an Booking in the database

Request Payload example:

```json
{
	"tour_id": ObjectId,
	"guide_id": ObjectId,
	"client_id": ObjectId,
	"people": number,
	"final_price": number,
	"booking_date": string
}
```

### Response

> Two responses, one with the id inserted and the second with the newBooking details inserted into database.

Request Payload example:

```json
{
	"result": {
		"insertId": ObjectId
	},
	"newBooking": {
		"booking_id": ObjectId,
		"tour_name": string,
		"tour_id": ObjectId,
		"client_name": string,
		"client_id": ObjectId,
		"people": number,
		"final_price": number,
		"booking_date": string,
		"guide_name": string,
		"guide_id": ObjectId
	}
}
```

## Edit_booking

### Request

`PUT /bookings/:id`

> Update a Booking in the database

Request Payload example:

```json
{
	"tour_id": ObjectId,
	"guide_id": ObjectId,
	"client_id": ObjectId,
	"people": number,
	"final_price": number,
	"booking_date": string
}
```

### Response

```json
{
	"booking_id": 1,
	"tour_name": "Tour 1",
	"tour_id": 101,
	"client_name": "Client 1",
	"client_id": 201,
	"people": 4,
	"final_price": 200.0,
	"booking_date": "2024-06-20",
	"guide_name": "Guide 1",
	"guide_id": 301
}
```

## Delete_booking

### Request

`DELETE /bookings/:id`

### Response

```json
{
	"message": "Booking deleted successfully"
}
```
