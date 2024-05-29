# Table of Contents

- [General info](#general-info)
- [Endpoints](#endpoints)
  - [Overview](#overview)
  - [Add collection](#add-collection)
  - [Get collection](#get-collection-by-id)
  - [Delete collection](#delete-collection-by-id)
  - [Add bottle](#add-bottle-to-collection-by-id)
  - [Get collections for user](#get-collections-by-user-id)
  - [Get bottle by id](#get-bottle-by-id)
  - [Update bottle](#update-bottle)
  - [Delete bottle](#delete-bottle-by-id)

# General info

This app provides a REST-API for all Distilando user collections and bottles.

# Endpoints

## Overview

This app uses the following endpoints and methods:

[`POST /collections/`](#add-collection)

[`GET /collections/:id`](#get-collection-by-id)

[`DELETE /collections/:id`](#delete-collection-by-id)

[`POST /collections/:id/bottle`](#add-bottle-to-collection-by-id)

[`GET /collections/user/:id`](#get-collections-by-user-id)

[`GET /collections/bottle/:id`](#get-bottle-by-id)

[`PUT /collections/bottle/:id`](#update-bottle)

[`DELETE /collections/bottle/:id`](#delete-bottle-by-id)

## Add collection

### Request

`POST /collections/`

Example POST body:

```
{
	"name": "Awesome Collection",
	"user_id": 12
}
```

## Get collection by ID

### Request

`GET /collections/:id`

### Optional queries

`?custom=1` 

If this query is present, regardless of value, then ONLY custom bottles in the collection will be sent in the response. For all bottles in collection the query should therefore be omitted.

### Response

```
{
	"collection_name": "Tropical",
	"user_id": 4,
	"bottles": [
        {
			"id": 1,
			"collection_id": 7,
			"created_at": "2023-01-02T12:04:25.000Z",
			"name": "1770 Glasgow 2015/2021",
			"size": "500ml",
			"alcohol_content": 61.7,
			"age": 6,
			"image_1": "4861531",
			"paid": {
				"value": 200,
				"currency": "EUR"
			},
			"condition": "Empty",
			"visibility": 0,
			"custom_bottle_id": null,
			"thoughts": "This Whisky is amazing",
			"product_id": 12999,
			"cask_types": [
				"First Fill Sherry Cask",
				"Oloroso",
				"Sherry"
			]
		},
        {
			"id": 2,
			"collection_id": 7,
			"created_at": "2023-01-04T14:44:16.000Z",
			"name": "Tobermory 1995 whic",
			"size": "700ml",
			"alcohol_content": 54.8,
			"age": 20,
			"image_1": null,
			"condition": "Empty",
			"visibility": 0,
			"custom_bottle_id": 41,
			"thoughts": "Great flavor",
			"product_id": null,
			"barcode": "354894631145",
			"no_barcode": false,
			"brand": "It definitely has one",
			"distillery": "Same as brand",
			"country": "Scotland",
			"region": "Islay",
			"bottler": "Example bottler",
			"series": "This one",
			"bottled_for": "Me",
			"market": "Not sure?",
			"category": "Whisky without e",
			"type": "Single single malt",
			"mash_bill": "Barley, 100%",
			"smoke": "Don't know, don't care",
			"coloring": "All natural my dude",
			"non_chill_filtered": "It's super chill, but not filtered",
			"limited": "It is",
			"number_of_bottles": 2,
			"cask_strength": 1,
			"distillation_date": "2010-03-04T23:00:00.000Z",
			"bottling_date": "2019-01-28T23:00:00.000Z",
			"distillation_runs": "It runs fast",
			"cask_size": "Pretty, pretty, pretty big",
			"cask_number": "1BC245",
			"age_classification": "Old enough to taste good",
			"paid": {
				"value": 200,
				"currency": "EUR"
			},
			"cask_types": [
				"Bourbon Hogshead", "Sherry"
			]
		},
        ...
	]
}
```

## Delete collection by ID

### Request

`DELETE /collections/:id`

The ID from the "collections" table is to be given as the ID params.

| :warning: WARNING          |
|:---------------------------|
| **Deleting a collection also removes the associated bottles!** Any custom bottles in the collection will also be removed from the respective table.     |

## Add bottle to collection by ID

### Request

`POST /collections/:id/bottle`

Adding a bottle to a collection requires the ID of the collection to be present in the URL params.

To add a bottle to a collection that already exists in the databse, it is sufficient to give the bottle_id along with the individual details in the request body. For custom bottles additional values are given which are then stored in the custom_bottles table.

Example POST body for existing product:

```
{
	"paid": {
		"value": 200,
		"currency": "EUR"
	},
	"visibility": true,
	"condition": "Closed",
	"thoughts": "goood",
	"product_id": 12999
}
```

Example POST body for custom bottle:

| :memo: NOTE          |
|:---------------------------|
| `barcode` and `no_barcode` are generally mutually exclusive: Both values can be empty, but an error will be thrown if both values are present.     |

```
{
	"paid": {
		"value": 200,
		"currency": "EUR"
	},
	"visibility": false,
	"condition": "Closed",
	"thoughts": "Great flavor",
	"name": "Barbie Bourbon",
	"cask_types": "Bourbon, Sherry",
	"age": 20,
	"size": "500ml",
	"alcohol_content": 65.3,
	"barcode": 123456,
	"no_barcode": false,
	"brand": "Testing brand",
	"distillery": "Testing distillery",
	"country": "Testing country",
	"region": "Testing region",
	"bottler": "Testing bottler",
	"series": "Testing series",
	"bottled_for": "Testing bottle for",
	"market": "Testing market",
	"category": "Testing category",
	"type": "Testing type",
	"mash_bill": "Testing mash bill",
	"smoke": "Testing smoke",
	"coloring": "Testing color",
	"non_chill_filtered": "Testing filtered status",
	"limited": "Testing limited",
	"number_of_bottles": 2,
	"cask_strength": 1,
	"distillation_date": "2010-03-05",
	"bottling_date": "2019-01-29",
	"distillation_runs": "Testing dist runs",
	"cask_size": "Testing cask_size",
	"cask_number": "Testing cask_number",
	"age_classification": "Testing age_class"
}
```

## Get collections by user ID

### Request

`GET /collections/user/:id`

### Response

```
[
	{
		"id": 1,
		"name": "Tropical"
	},
	{
		"id": 2,
		"name": "Irish Whiskeys"
	}
    ...
]
```

## Get collections by user ID

### Request

`GET /collections/user/:id`

### Response

```
[
	{
		"id": 1,
		"name": "Tropical"
	},
	{
		"id": 2,
		"name": "Irish Whiskeys"
	}
    ...
]
```

## Get bottle by ID

### Request

`GET /collections/bottle/:id?user_id=1`

| :memo: NOTE          |
|:---------------------------|
| The user_id query is necessary as a check is in place to make sure the bottle exists and belongs to said user     |

### Response

This route returns a bottle which is having either a product_id or a custom_bottle_id. In this example its having product_id and custom_bottle_id is `null`

```
 {
    "id": 5,
    "collection_id": 2,
    "name": "1770 Glasgow 2015/2021 - Oloroso Sherry Cask No. 15/165 Limited Edition Germany Exclusive",
    "size": "500ml",
    "alcohol_content": 61.7,
    "age": 6,
    "image_1": "4/8/6/1/4861531cf758fdda55421e5c37ae1284d6469573_18178_10.jpg",
    "paid": {
	"value": 250,
	"currency": "EUR"
    },
    "condition": "Closed",
    "visibility": 0,
    "custom_bottle_id": null,
    "thoughts": "Me likey",
    "product_id": 12999,
    "cask_types": [
        "First Fill Sherry Cask",
        "Oloroso",
        "Sherry"
    ]
 }
```

If the bottle is custom, the product_id is `null` and additional custom bottle fields are returned:

```
{
	"id": 3594,
	"collection_id": 87,
	"created_at": "2023-01-17T10:22:36.000Z",
	"name": "Barbie Bourbon",
	"size": "500ml",
	"alcohol_content": 65.3,
	"age": 20,
	"image_1": null,
	"condition": "Closed",
	"visibility": 0,
	"custom_bottle_id": 6236,
	"thoughts": "Great flavor",
	"product_id": null,
	"barcode": null,
	"no_barcode": true,
	"brand": "Testing brand",
	"distillery": "Testing distillery",
	"country": "Testing country",
	"region": "Testing region",
	"bottler": "Testing bottler",
	"series": "Testing series",
	"bottled_for": "Testing bottle for",
	"market": "Testing market",
	"category": "Testing category",
	"type": "Testing type",
	"mash_bill": "Testing mash bill",
	"smoke": "Testing smoke",
	"coloring": "Testing color",
	"non_chill_filtered": "Testing filtered status",
	"limited": "Testing limited",
	"number_of_bottles": 2,
	"cask_strength": 1,
	"distillation_date": "2010-03-04T23:00:00.000Z",
	"bottling_date": "2019-01-28T23:00:00.000Z",
	"distillation_runs": "Testing dist runs",
	"cask_size": "Testing cask_size",
	"cask_number": "Testing cask_number",
	"age_classification": "Testing age_class",
	"paid": {
		"value": 200,
		"currency": "EUR"
	},
	"cask_types": [
		"Bourbon",
		"Sherry"
	]
}
```

## Update bottle

### Request

`PUT /collections/bottle/:id`

Updating a bottle within a collection requires the ID of the bottle to be present in the URL params.

Given product_id OR custom_bottle_id in req.body the specified entry will be updated in all relevant tables. As in POST bottle above, custom bottles generally require aditional information. For updates to bottles referencing products in database, the given values can be left off or given `null` value.

Example PUT body for updating existing product:

```
{
	"id": 1,
	"custom_bottle_id": null,
	"product_id": 12999,
	"name": null,
	"size": null,
	"alcohol_content": null,
	"age": null,
	"cask_types": null,
	"image_1": null,
	"paid": {
		"value": 25,
		"currency": "EUR"
	},
	"condition": "Closed",
	"visibility": true,
	"thoughts": "Me likey"
}
```

Example PUT body for updating custom bottle:

| :memo: NOTE          |
|:---------------------------|
| `barcode` and `no_barcode` are generally mutually exclusive: Both values can be empty, but an error will be thrown if both values are present.     |

```
{
	"id": 2,
	"product_id": null,
	"name": "New",
	"size": "700ml",
	"alcohol_content": 50.5,
	"age": 12,
	"cask_types": "Bourbon, Oloroso, PX",
	"image_1": null,
	"paid": {
		"value": 30,
		"currency": "EUR"
	},
	"condition": "Closed",
	"visibility": false,
	"thoughts": "Pretty good",
	"barcode": "123456",
	"no_barcode": false,
	"brand": "Updated brand",
	"distillery": "Updated distillery",
	"country": "Updated country",
	"region": "Updated region",
	"bottler": "Updated bottler",
	"series": "Updated series",
	"bottled_for": "Updated bottle for",
	"market": "Updated market",
	"category": "Updated category",
	"type": "Updated type",
	"mash_bill": "Updated mash bill",
	"smoke": "Updated smoke",
	"coloring": "Updated color",
	"non_chill_filtered": "Updated filtered status",
	"limited": "Updated limited",
	"number_of_bottles": 2,
	"cask_strength": 1,
	"distillation_date": "2010-03-04",
	"bottling_date": "2019-01-28",
	"distillation_runs": "Updated dist runs",
	"cask_size": "Updated cask_size",
	"cask_number": "Updated cask_number",
	"age_classification": "Updated age_class"
}
```

## Delete bottle by ID

### Request

`DELETE /collections/bottle/:id`

The ID from "collection_bottles" should be used in the params. If the bottle is a custom one, the values in "custom_bottles" are also deleted.
