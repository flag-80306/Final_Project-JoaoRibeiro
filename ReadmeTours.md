# General Info

This app provides a REST API for managing tours, including listing all tours, retrieving a tour by ID, adding a new tour, editing a tour, and deleting a tour.

# Endpoints

## Overview

This app uses the following endpoints and methods:

[`GET /tours`](#Get_All_Tours)

[`GET /tours/:id`](#Get_Tour_by_ID)

[`POST /tours/register`](#Add_New_Tour)

[`PUT /tours/:id`](#Edit_Tour)

[`DELETE /tours/:id`](#Delete_Tour)

## Get_All_Tours

### Request

`GET /tours`

#### Optional Queries

- `?limit=<number>`: Limit the number of results returned. Default is 3.
- `?offset=<number>`: Offset the results by a specified number. Default is 0.

### Response

> Gets all the Tours in the Database and returns array of objects with all the tours and will also return the count(\*) of tour as totalTours.

Response Payload example:

```json
{
    "result": [
        {
            "tour_id": ObjectId,
            "tour_name": string,
            "location": string,
            "description": string,
            "duration": string,
            "price_person": number,
            "images": string,
            "guide_names": string,
            "guide_id": string
        },
        ...
    ],
    "totalTours": number
}
```

## Get_Tour_by_ID

### Request

`GET /tours/:id`

### Response

> Gets a single Tour based on the database Id and returns an two responses, a result with an array and one object and a second response wirh the averageTourRating that I have calculate in rateDB.js with the function getAverageTourRate().

Response Payload example:

```json
{
	"result": [
		{
			"tour_id": ObjectId,
            "tour_name": string,
            "location": string,
            "description": string,
            "duration": string,
            "price_person": number,
            "images": string,
            "guide_names": string,
            "guide_id": string
		}
	],
	"averageTourRating": number
}
```

## Add_New_Tour

### Request

`POST /tours/register`

> Inserts an Tour in the database

Request Payload example:

```json
{
	    "tour_name": string,
        "location": string,
        "description": string,
        "duration": string,
        "price_person": number,
        "images": string
}
```

### Response

Response Payload example:

```json
{
	    "tour_id": ObjectId,
	    "tour_name": string,
        "location": string,
        "description": string,
        "duration": string,
        "price_person": number,
        "images": string,
	    "guide_names": string,
	    "guide_id": string
}
```

## Edit_Tour

### Request

`PUT /tours/:id`

> Updates Tour in the database

Request Payload example:

```json
{
	"tour_name": string,
    "location": string,
    "description": string,
    "duration": string,
    "price_person": number,
    "images": string
}
```

### Response

```json
{
	"tour_id": ObjectId,
	"tour_name": string,
    "location": string,
    "description": string,
    "duration": string,
    "price_person": number,
    "images": string,
	"guide_names": string,
	"guide_id": string
}
```

## Delete_Tour

### Request

`DELETE /tours/:id`

### Response

> Returns a confirmation message of the deletion.

```json
{
	"message": "Tour deleted successfully"
}
```

### Notes

- Deleting a tour will also remove associated guides, bookings, favorite tours, and reviews from the respective tables.
