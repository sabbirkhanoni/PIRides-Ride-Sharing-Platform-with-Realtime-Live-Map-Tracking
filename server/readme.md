# Rider Registration Endpoint Documentation

## Endpoint

`POST /riders/register`

## Description

Registers a new rider in the PIRides Ride Sharing Platform. This endpoint creates a new rider account with vehicle details and returns an authentication token upon successful registration.

## Request Method

`POST`

## Request URL

`/riders/register`

## Request Body

Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "<First Name>",
    "lastname": "<Last Name>" // optional
  },
  "email": "<rider email>",
  "password": "<rider password>",
  "vehicle": {
    "color": "<vehicle color>",
    "plate": "<vehicle plate>",
    "capacity": <vehicle capacity>,
    "vehicleType": "car" | "bike" | "cng"
  }
}
```

### Required Fields

- `fullname.firstname` (string, min 3 chars, required)
- `email` (string, required, must be unique)
- `password` (string, min 6 chars, required)
- `vehicle.color` (string, min 3 chars, required)
- `vehicle.plate` (string, min 3 chars, required, must be unique)
- `vehicle.capacity` (number, min 1, required)
- `vehicle.vehicleType` (string, one of: `car`, `bike`, `cng`, required)

### Optional Fields

- `fullname.lastname` (string, min 3 chars, optional)
- `location.latitude` (number, optional)
- `location.longitude` (number, optional)

## Example Request

```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Smith"
  },
  "email": "alexsmith@example.com",
  "password": "riderPass123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
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
  "message": "Rider registered successfully",
  "error": false,
  "success": true,
  "token": "<JWT token>",
  "data": {
    "_id": "<rider id>",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Smith"
    },
    "email": "alexsmith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "status": "inactive",
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

#### 400 Bad Request (Rider Already Exists)

```
Status: 400
Content-Type: application/json
```

```json
{
  "message": "Rider already exists",
  "error": true,
  "success": false
}
```

## Notes for Frontend Developers

- On success, store the returned `token` for authentication in future requests.
- Handle error messages and display them to the user as appropriate.
- The `data` object in the response contains the newly created rider's information (except password).

---

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

## Notes for Frontend Developers

- On success, store the returned `token` for authentication in future requests.
- Handle error messages and display them to the user as appropriate.
- The `data` object in the response contains the newly created user's information (except password).

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user and returns a JWT token if the credentials are valid.

## Request Method

`POST`

## Request URL

`/users/login`

## Request Body

Send a JSON object with the following structure:

```
{
  "email": "<user email>",
  "password": "<user password>"
}
```

### Required Fields

- `email` (string, required)
- `password` (string, required)

## Example Request

```json
{
  "email": "johndoe@example.com",
  "password": "yourPassword123"
}
```

## Responses

### Success (200 OK)

```
Status: 200
Content-Type: application/json
```

```json
{
  "message": "User logged in successfully",
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

#### 400 Bad Request (Invalid Email or Password)

```
Status: 400
Content-Type: application/json
```

```json
{
  "message": "Invalid email or password",
  "error": true,
  "success": false
}
```

#### 400 Bad Request (Invalid Password)

```
Status: 400
Content-Type: application/json
```

```json
{
  "message": "Invalid Password",
  "error": true,
  "success": false
}
```

## Notes for Frontend Devloping

- On success, store the returned `token` for authentication in future requests.
- Handle error messages and display them to the user as appropriate.
- The `data` object in the response contains the newly created user's information (except password).
- The endpoint expects the `Content-Type: application/json` header.

---

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

Fetches the profile information of the currently authenticated user. Requires a valid JWT token in the request (as a cookie or in the Authorization header).

## Request Method

`GET`

## Request URL

`/users/profile`

## Request Headers

- `Authorization: Bearer <token>` (if not using cookies)

## Example Request (with Bearer token)

```
GET /users/profile
Authorization: Bearer <token>
```

## Success Response (200 OK)

```
Status: 200
Content-Type: application/json
```

```json
{
  "message": "User Profile Fetch Successfully",
  "error": false,
  "success": true,
  "data": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "_id": "<user id>",
    "email": "johndoe@example.com"
  }
}
```

## Error Responses

- 401 Unauthorized: If token is missing, invalid, or blacklisted.

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the currently authenticated user by blacklisting their JWT token. After logout, the token cannot be used for further requests.

## Request Method

`GET`

## Request URL

`/users/logout`

## Request Headers

- `Authorization: Bearer <token>` (if not using cookies)

## Example Request (with Bearer token)

```
GET /users/logout
Authorization: Bearer <token>
```

## Success Response (200 OK)

```
Status: 200
Content-Type: application/json
```

```json
{
  "message": "User logged out successfully",
  "error": false,
  "success": true
}
```

## Error Responses

- 401 Unauthorized: If token is missing, invalid, or already blacklisted.

## Notes for Frontend Developers

- Always send the JWT token as a cookie or in the `Authorization` header as `Bearer <token>`.
- After logout, the token is blacklisted and cannot be used for any further requests.
- Handle error messages and display them to the user as appropriate.
