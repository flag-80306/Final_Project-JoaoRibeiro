# General Info

This app provides a REST-API for managing guides, including listing all guides, retrieving a guide by ID, adding a new guide, editing a guide, and deleting a guide.

# Endpoints

## Overview

This app uses the following endpoints and methods:

[`GET /guides`](#Get_All_Guides)

[`GET /guides/:id`](#Get_Guide_by_ID)

[`POST /guides/register`](#Add_New_Guide)

[`PUT /guides/:id`](#Edit_Guide)

[`DELETE /guides/:id`](#Delete_Guide)

## Get_All_Guides

### Request

`GET /guides`

### Response

> Gets all the Guides in the Database and returns array of objects.

Response Payload example:

```json
[
    {
        "guide_id": ObjectId,
        "guide_name": string,
        "description": string,
        "picture": string
    },
    ...
]
```

## Get_Guide_by_ID

### Request

`GET /guides/:id`

### Response

> Gets a single Guide based on the database Id and returns a one object.

Response Payload example:

```json
{
    "guide_id": ObjectId,
    "guide_name": string,
    "description": string,
    "picture": string
}
```

## Add_New_Guide

### Request

`POST /guides/register`

> Inserts an Guide in the database

Request Payload example:

```json
{
	"guide_name": string,
    "description": string,
    "picture": string
}
```

### Response

```json
{
	"guide_id": ObjectId,
    "guide_name": string,
    "description": string,
    "picture": string
}
```

## Edit_Guide

### Request

`PUT /guides/:id`

Example PUT body:

```json
{
	"guide_name": string,
    "description": string,
    "picture": string
}
```

### Response

Response Payload example:

```json
{
	"guide_id": ObjectId,
    "guide_name": string,
    "description": string,
    "picture": string
}
```

## Delete_guide

### Request

`DELETE /guides/:id`

### Response

> Returns a confirmation message of the deletion.

```json
{
	"message": "Guide deleted successfully"
}
```
