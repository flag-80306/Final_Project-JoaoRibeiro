# General Info

This app provides a REST-API for managing tour guides, including listing all tour guides, retrieving a tour guide by tour ID, adding a new tour guide, editing a tour guide, and deleting a tour guide.

# Endpoints

## Overview

This app uses the following endpoints and methods:

[`GET /tour_guide`](#Get_all_tour_guides)

[`GET /tour_guide/:id`](#Get_tour_guide_by_tour_ID)

[`POST /tour_guide/register`](#Add_new_tour_guide)

[`PUT /tour_guide/:tour_id/:guide_id`](#edit-tour-guide)

[`DELETE /tour_guide/:tour_id/:guide_id`](#delete-tour-guide)

## Get_all_tour_guides

### Request

`GET /tour_guide`

### Response

> Gets all the TourGuide realtions in the Database and returns array of objects.

Response Payload example:

```json
[
    {
        "tour_id": ObjectId,
        "guide_id": ObjectId,
        "tour_name": string,
        "guide_name": string
    },
    ...
]
```

## Get_tour_guide_by_tour_ID

### Request

`GET /tour_guide/:id`

### Response

> Gets a single relation based in tourID in the database and returns array of objects.

Response Payload example:

```json
[
    {
        "tour_id": ObjectId,
        "guide_id": ObjectId,
        "tour_name": string,
        "guide_name": string
    },
    ...
]
```

## Add_new_tour_guide

### Request

`POST /tour_guide/register`

> Inserts new relation based in the tour ID and guide ID.

Request Payload example:

```json
{
	"tour_id": ObjectId,
	"guide_id": ObjectId
}
```

### Response

```json
{
	"tour_id": ObjectId,
    "guide_id": ObjectId,
    "tour_name": string,
    "guide_name": string
}
```

## Edit tour guide

### Request

`PUT /tour_guide/:tour_id/:guide_id`

> Update relation based in guide ID.

Request Payload example

```json
{
	"newGuide_id": ObjectId
}
```

### Response

> Returns the details of the updated admin.

Response Payload example:

```json
{
	"message": "Guide_id updated successfully"
}
```

## Delete tour guide

### Request

`DELETE /tour_guide/:tour_id/:guide_id`

### Response

> Returns a confirmation message of the deletion.

```json
{
	"message": "Guide_id deleted successfully"
}
```
