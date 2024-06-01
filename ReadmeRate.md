# General Information

This application provides a REST API to manage tour ratings. The API allows listing all ratings, retrieving a rating by ID, retrieving ratings by tour ID, client ID, or booking ID, adding a new rating, editing a rating, and deleting a rating.

# Endpoints

## Overview

This application uses the following endpoints and methods:

[`GET /rate`](#Get_All_Rates)

[`GET /rate/:id`](#Get_Rate_by_ID)

[`GET /rate/tour/:id`](#Get_Rate_by_Tour_ID)

[`GET /rate/client/:id`](#Get_Rate_by_Client_ID)

[`GET /rate/booking/:id`](#Get_Rate_by_Booking_ID)

[`POST /rate/register`](#Add_New_Rate)

[`PUT /rate/:id`](#Edit_Rate)

[`DELETE /rate/:id`](#Delete_Rate)

## Get_All_Rates

### Request

`GET /rate`

### Response

> Gets all the rated tours in the Database as an array and returns array of objects.

Response Payload example:

```json
[
    {
        "id": ObjectId,
        "tour_id": ObjectId,
        "client_id": ObjectId,
        "rate": number,
        "booking_id": ObjectId,
        "createdAt": string,
        "updatedAt": string
    },
    ...
]
```

## Get_Rate_by_ID

### Request

`GET /rate/:id`

### Response

> Gets a single rate based on the database Id and returns a one object.

Response Payload example:

```json
{
	 "id": ObjectId,
        "tour_id": ObjectId,
        "client_id": ObjectId,
        "rate": number,
        "booking_id": ObjectId,
        "createdAt": string,
        "updatedAt": string
}
```

## Get_Rate_by_Tour_ID

### Request

`GET /rate/tour/:id`

### Response

> Gets a single rate based on tour ID in the database and returns array of objects.

Response Payload example:

```json
[
    {
       "id": ObjectId,
        "tour_id": ObjectId,
        "client_id": ObjectId,
        "rate": number,
        "booking_id": ObjectId,
        "createdAt": string,
        "updatedAt": string
    },
    ...
]
```

## Get_Rate_by_Client_ID

### Request

`GET /rate/client/:id`

### Response

> Gets a single rate based on Client ID in the database and returns array of objects.

Response Payload example:

```json
[
    {
        "id": ObjectId,
        "tour_id": ObjectId,
        "client_id": ObjectId,
        "rate": number,
        "booking_id": ObjectId,
        "createdAt": string,
        "updatedAt": string
    },
    ...
]
```

## Get_Rate_by_Booking_ID

### Request

`GET /rate/booking/:id`

### Response

> Gets a single rate based on Booking ID in the database and returns array of objects.

Response Payload example:

```json
[
    {
        "id": ObjectId,
        "tour_id": ObjectId,
        "client_id": ObjectId,
        "rate": number,
        "booking_id": ObjectId,
        "createdAt": string,
        "updatedAt": string
    },
    ...
]
```

## Add_New_Rate

### Request

`POST /rate/register`

> Inserts a rate in the database.

Response Payload example:

```json
{
	    "tour_id": ObjectId,
        "client_id": ObjectId,
        "rate": number,
        "booking_id": ObjectId
}
```

### Response

Response Payload example:

```json
{
	    "id": ObjectId,
        "tour_id": ObjectId,
        "client_id": ObjectId,
        "rate": number,
        "booking_id": ObjectId,
        "createdAt": string,
        "updatedAt": string
}
```

## Edit_Rate

### Request

`PUT /rate/:id`

> Updates rate in the database

Request Payload example:

```json
{
	    "tour_id": ObjectId,
        "client_id": ObjectId,
        "rate": number,
        "booking_id": ObjectId
}
```

### Response

Response Payload example:

```json
{
	    "id": ObjectId,
        "tour_id": ObjectId,
        "client_id": ObjectId,
        "rate": number,
        "booking_id": ObjectId,
        "createdAt": string,
        "updatedAt": string
}
```

## Delete_Rate

### Request

`DELETE /rate/:id`

### Response

> Returns a confirmation message of the deletion.

```json
{
	"affectedRows": 1,
	"changedRows": 0
}
```
