# API for Water My Plants project

## endpoints

### POST /api/login
* Provide a body with username and password. Returns a jwt token.
* Request example:
```
{
  "username": "user",
  "password": "password"
}
```
* Returns 
```
{
  message: 'thank you for logging in, user', token: {token}
}
```
* Use the provided token in the authorization header on future requests

### POST /api/register
* registers a user. must have username, password, email, and phone number. image url optional.

### GET /api/users/{user id} [TODO]

### GET /api/users/ [TODO]

### GET /api/plants [TODO]
* Get a list of all plants in the db

### GET /api/users/{userId}/plants
* Get a list of all user's plants (json objects)

### GET /api/users/{userId}/plants/{plantId}
* Get details on one user plant (object)

### PUT /api/users/{userId}
* Update user info

### PUT /api/users/{userId}/plants{plantId}
* Update one user plant

### POST /api/users/{userId}/plants
* Add a new plant for the user
