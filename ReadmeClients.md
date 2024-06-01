# General Info

This app provides a REST-API for managing clients, including listing all clients, retrieving a client by ID, adding a new client, logging in a client, editing a client, updating a client's password, and deleting a client.

# Endpoints

## Overview

This app uses the following endpoints and methods:

[`GET /clients`](#Get_All_Clients)

[`GET /clients/:id`](#Get_Client_by_ID)

[`POST /clients/register`](#Add_New_Client)

[`POST /clients/login`](#Client_login)

[`PUT /clients/:id`](#Edit_client)

[`PUT /clients/updatePassword/:id`](#Update_client_password)

[`DELETE /clients/:id`](#Delete_client)

## Get_All_Clients

### Request

`GET /clients`

### Response

> Gets all the Clients in the Database and returns array of objects.

Response Payload example:

```json
[
    {
        "client_id": ObjectId,
        "email": string,
        "tin": string,
        "client_name": string,
        "city": string,
        "country": string
    },
    ...
]
```

## Get_Client_by_ID

### Request

`GET /clients/:id`

### Response

> Gets a single Client based on the database Id and returns a one object.

Response Payload example:

```json
{
	"client_id": ObjectId,
    "email": string,
    "tin": string,
    "client_name": string,
    "city": string,
    "country": string
}
```

## Add_New_Client

### Request

`POST /clients/register`

> Inserts an Client in the database

Request Payload example:

```json
{
	"email": string,
	"password": string,
	"tin": string,
    "client_name": string,
    "city": string,
    "country": string
}
```

### Response

```json
{
	"client_id": ObjectId,
	"email": string,
	"tin": string,
    "client_name": string,
    "city": string,
    "country": string
}
```

## Client_login

### Request

`POST /clients/login`

> Client login

Request Payload example:

```json
{
	"email": string,
	"password": string
}
```

### Response

```json
{
	"status": "Ok",
	"message": "Client logged in successfully",
	"token": "JWT token here"
}
```

## Edit_client

### Request

`PUT /clients/:id`

Example PUT body:

```json
{
	"email": string,
	"tin": string,
    "client_name": string,
    "city": string,
    "country": string
}
```

### Response

```json
{
	"client_id": ObjectId,
	"email": string,
	"tin": string,
    "client_name": string,
    "city": string,
    "country": string
}
```

## Update_client_password

### Request

`PUT /clients/updatePassword/:id`

Example PUT body:

```json
{
	"currentPassword": string,
	"newPassword": string
}
```

### Response

```json
{
	"status": "success",
	"message": "User updated password successfully"
}
```

## Delete_client

### Request

`DELETE /clients/:id`

### Response

```json
{
	"message": "Client deleted successfully"
}
```
