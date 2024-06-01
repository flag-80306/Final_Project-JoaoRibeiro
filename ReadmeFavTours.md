# Informações Gerais

This application provides a REST API to manage favorite tours, including listing all favorite tours of clients, retrieving favorite tours by client ID, retrieving favorite tours by client ID and tour ID, adding a new favorite tour, editing a favorite tour, and deleting a favorite tour.

# Endpoints

## Overview

This application uses the following endpoints and methods:

[`GET /favourite_tours`](#Get_All_Favorite_Client_Tours)

[`GET /favourite_tours/:id`](#Get_Favorite_Tours_by_Client_ID)

[`GET /favourite_tours/:client_id/:tour_id`](#Get_Favorite_Tours_by_Client_ID_and_Tour_ID)

[`POST /favourite_tours/register`](#Add_New_Favorite_Tour)

[`PUT /favourite_tours/:client_id/:tour_id`](#Edit_Favorite_Tour)

[`DELETE /favourite_tours/:client_id/:tour_id`](#Delete_Favorite_Tour)

## Get_All_Favorite_Client_Tours

### Request

`GET /favourite_tours`

### Response

> Gets all the Favourite Tours in the Database as an array and returns an array of objects.

Response Payload example:

```json
[
    {
        "client_id":  ObjectId,
        "tour_id":  ObjectId,
        "client_name": string,
        "tour_name": string
    },
    ...
]
```

## Get_Favorite_Tours_by_Client_ID

### Request

`GET /favourite_tours/:id`

### Response

> Gets Favourites Tours based on the client ID in database and returns an array of objects.

Response Payload example:

```json
[
    {
        "client_id":  ObjectId,
        "tour_id":  ObjectId,
        "client_name": string,
        "tour_name": string
    },
    ...
]
```

## Get_Favorite_Tours_by_Client_ID_and_Tour_ID

### Request

`GET /favourite_tours/:client_id/:tour_id`

### Response

> Gets a single Favourite Tour based on client ID and tour ID in database and returns an objects.

Response Payload example:

```json
[
	{
		"client_id":  ObjectId,
        "tour_id":  ObjectId,
        "client_name": string,
        "tour_name": string
	}
]
```

## Add_New_Favorite_Tour

### Request

`POST /favourite_tours/register`

> Inserts a Favourite Tour into database

Request Payload example:

```json
{
	"client_id":  ObjectId,
        "tour_id":  ObjectId
}
```

### Response

```json
{
	"client_id":  ObjectId,
        "tour_id":  ObjectId,
        "client_name": string,
        "tour_name": string
}
```

## Edit_Favorite_Tour

### Request

`PUT /favourite_tours/:client_id/:tour_id`

> Updates Favourite Tour in the database

Request Payload example:

```json
{
	"newTour_id": ObjectId
}
```

### Response

```json
{
	"message": "Tour_id updated successfully"
}
```

## Delete_Favorite_Tour

### Request

`DELETE /favourite_tours/:client_id/:tour_id`

### Response

```json
{
	"result": "...",
	"message": "Favourite tour removed successfully"
}
```
