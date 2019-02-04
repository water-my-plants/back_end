# API for Water My Plants project

## endpoints

### POST /api/register
* registers a user. must have username, password, email, and phone number. image url optional.
* Reqeust example: 
```
{
  username: "john",
  password: "password123",
  email: "john@gmail.com",
  phone: "123-456-7890"
}
```
* Returns
```
{
  username: "john",
  email: "john@gmail.com",
  phone: "123-456-7890"
}
```

---
### POST /api/login
* Provide a body with username and password. Returns a user object and a jwt token.
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
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@gmail.com",
    "phone": "123-456-7890",
    "img_url": null
  },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1c3RpbiIsImlhdCI6MTU0OTI5MTkyNiwiZXhwIjoxNTQ5MjkzNzI2fQ.VKTfCZGKUbpzepZUvoQNkL-5zjJnU2WmTIW7fdXkrA8"
}
```
* Use the provided token in the authorization header on future requests

---
### GET /api/users/{user id} [TODO]
**JWT token required**

---
### GET /api/users/ [TODO]
**JWT token required**

---
### GET /api/plants [TODO]
* returns all plants in the db

---
### GET /api/users/{userId}/plants
**JWT token required**
* Get a list of all user's plants (json objects)

---
### GET /api/users/{userId}/plants/{plantId}
**JWT token required**
* Get details on one user plant (object)

---
### PUT /api/users/{userId}
**JWT token required**
* Update user info

---
### PUT /api/users/{userId}/plants{plantId}
**JWT token required**
* Update one user plant

---
### POST /api/users/{userId}/plants
**JWT token required**
* Add a new plant for the user
