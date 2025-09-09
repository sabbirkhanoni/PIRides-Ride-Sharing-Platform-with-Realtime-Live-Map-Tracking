# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the PIRides Ride Sharing Platform. This endpoint creates a new user account and returns an authentication token upon successful registration.

## Request Method

`POST`

## Request URL

`/users/register`

## Request Body

Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "<First Name>",
    "lastname": "<Last Name>" // optional
  },
  "email": "<user email>",
  "password": "<user password>"
}
```

### Required Fields

- `fullname.firstname` (string, min 3 chars, required)
- `email` (string, min 8 chars, required, must be unique)
- `password` (string, required)

### Optional Fields

- `fullname.lastname` (string, min 3 chars, optional)

## Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourPassword123"
}
```

## Responses

### Success (201 Created)

```
Status: 201
Content-Type: application/json
```

```json
{
  "message": "User created successfully",
  "error": false,
  "success": true,
  "token": "<JWT token>",
  "data": {
    "_id": "<user id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "socketId": null
  }
}
```

### Error Responses

#### 400 Bad Request (Missing Fields)

```
Status: 400
Content-Type: application/json
```

```json
{
  "message": "Please provide all required fields",
  "error": true,
  "success": false
}
```

#### 400 Bad Request (User Already Exists)

```
Status: 400
Content-Type: application/json
```

```json
{
  "message": "User already exists",
  "error": true,
  "success": false
}
```

#### 500 Internal Server Error

```
Status: 500
Content-Type: application/json
```

```json
{
  "message": "Internal server error",
  "error": true,
  "success": false
}
```

## Notes for Frontend Devloping

- On success, store the returned `token` for authentication in future requests.
- Handle error messages and display them to the user.
- The `data` object in the response contains the newly created user's information (except password).
