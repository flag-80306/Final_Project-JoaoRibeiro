# General Info

This system provides a REST API to manage admin logins, including CRUD operations (create, read, update, and delete) on admin data.

# Endpoints

## Overview

This system uses the following endpoints and methods:

[`GET /admin/`](#Get_All_Admins)

[`GET /admin/:id`](#Get_Admin_by_ID)

[`POST /admin/register`](#Register_New_Admin)

[`POST /admin/login`](#Login_Admin)

[`PUT /admin/:id`](#Update_Admin)

[`DELETE /admin/:id`](#Delete_Admin)

## Get_All_Admins

### Request

`GET /admin/`

### Response

> Gets all the Admins in the Database and returns array of objects.

Response Payload example:

```json
[
	{
	"manager_id": ObjectId,
	"email": string,
	"password": string,
	"manager_name": string,
	"created_at": string,
	"updated_at": string
	},
	...
]
```

## Get_Admin_by_ID

### Request

`GET /admin/:id`

### Response

> Gets a single Admin based on the database Id and returns a one object.

Response Payload example:

```json
{
	"manager_id": ObjectId,
	"email": string,
	"password": string,
	"manager_name": string,
	"created_at": string,
	"updated_at": string
}
```

## Register_New_Admin

### Request

`POST /admin/register`

> Inserts an Admin in the database

Request Payload example:

```json
{
	"email": string,
	"password": string,
	"manager_name": string
}
```

### Response

Response Payload example:

```json
{
	"manager_id": ObjectId,
	"email": string,
	"password": string,
	"manager_name": string,
	"created_at": string,
	"updated_at": string
}
```

## Login_Admin

### Request

`POST /admin/login`

> Request Payload example:

```json
{
	"email": string,
	"password": string
}
```

### Response

> Returns an authentication token if the login is successful.
> Response Payload example:

```json
{
	"status": "Ok",
	"message": "Manager logged in successfully",
	"token": string
}
```

## Update_Admin

### Request

`PUT /admin/:id`

> Updates Admin in the database

Request Payload example:

```json
{
	"email": string,
	"password": string,
	"manager_name": string
}
```

### Response

> Returns the details of the updated admin.

Response Payload example:

```json
{
	"manager_id": ObjectId,
	"email": string,
	"manager_name": string
}
```

## Delete_Admin

### Request

`DELETE /admin/:id`

### Response

> Returns a confirmation message of the deletion.

```json
{
	"status": "Ok",
	"message": "Manager deleted successfully"
}
```
