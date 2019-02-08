# API for Water My Plants project

## Base URL: https://watermyplants.herokuapp.com

### Twilio Note:
The api is set up for Twilio integration to send users a text message when their plant is ready to be watered. Unfortunately, with the Twilio test account we used, you can only send SMS messages to verified numbers that you have added in your account panel. Upgrading from a test account will allow your server to send messages to all users. 

If you would like to clone/fork the server and deploy it on Heroku, you can set it up to use Twilio by entering the following config variables in your Heroku settings:

* `ACCOUNT_SID:` ACCOUNT SID # found in your Twilio dashboard
* `AUTH_TOKEN:` Found in your Twilio dashboard 
* `TW_PHONE:` Found in your Twilio dashboard

## Endpoints

### POST /api/register
* registers a user. must have username, password, email, and phone number. image url optional.
* Request example: 
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
  "username": "john",
  "password": "password123"
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
### GET /api/users/{user id}
**JWT token required**
* Returns an object with a single user's info. Only accessible by that user.
```
{
 "user": {
    "id": 1,
    "username": "john",
    "email": "john@gmail.com",
    "phone": "123-456-7890",
    "img_url": null
}
```

---
### GET /api/users/
**JWT token required**
* Returns a list of all usernames and img_urls.

---
### GET /api/plants
* returns all plants in the db:
```
[
    {
        "name": "rose",
        "description": null,
        "characteristics": null
    },
    {
        "name": "daisy",
        "description": null,
        "characteristics": null
    },
    {
        "name": "primrose",
        "description": null,
        "characteristics": null
    },
    {
        "name": "cactus",
        "description": null,
        "characteristics": null
    }
]
```

---
### GET /api/plants/{plantId}
* Returns information on a single plant. Only accessible by plant owner.
```
{
    "id": 59,
    "user_id": 1,
    "name": "Marigold",
    "location": "it",
    "description": null,
    "last_water": null
}
```

---
### GET /api/users/{userId}/plants
**JWT token required**
* Returns a list of all user's plants (json objects) and scheduled watering times. Only accessible by plant owner.
* Return example:
```
[
    {
        "id": 59,
        "user_id": 1,
        "name": "Marigold",
        "location": "it",
        "description": null,
        "last_water": null,
        "schedule": [
            {
                "id": 2036,
                "watering_time": "2019-02-07T15:33:50.000Z"
            },
            {
                "id": 2037,
                "watering_time": "2019-02-07T16:50:50.000Z"
            }
        ]
    },
    {
        "id": 36,
        "user_id": 1,
        "name": "Thistle",
        "location": "bedroom",
        "description": "",
        "last_water": null,
        "schedule": [
            {
                "id": 163,
                "watering_time": "2045-02-07T08:00:00.000Z"
            },
            {
                "id": 164,
                "watering_time": "2038-02-05T00:00:00.000Z"
            }
        ]
    },
]
```

---
### PUT /api/users/{userId}
**JWT token required**
* Update user info. Only accessible by that user.

---
### PUT /api/plants/{plantId}
**JWT token required**
* Update plant. Only accessible by plant owner.

---
### POST /api/users/{userId}/plants
**JWT token required**
* Add a new plant for the user
* POST BODY:
```
{
	"name": "ficus"
}
```
* Returns:
```
{
    "id": 168,
    "user_id": 1,
    "name": "ficus",
    "location": null,
    "description": null,
    "last_water": null
}
```

---
### DELETE /api/plants/{plantId}
**JWT token required**
* Delete plant. Only accessible by plant owner.

---
### POST /api/plants/{plantId}
**JWT token required**
* Add watering times to a plant.
* Accepts an array of times in format `YYYY-MM-DD HH:SS` and adds them to the watering schedule
* POST body:
```
	"times": ["2019-02-05 18:00", "2019-02-07 8:00"]
```
* Returns the updated plant watering schedule:
```
[
    {
        "id": 2191,
        "watering_time": "2019-02-05T18:00:00.000Z"
    },
    {
        "id": 2192,
        "watering_time": "2019-02-07T08:00:00.000Z"
    }
]
```

---
### GET /api/plants/{plantId}/schedule
**JWT token required**
* Returns an array of scheduled watering times
```
[
    {
        "id": 2191,
        "watering_time": "2019-02-05T18:00:00.000Z"
    },
    {
        "id": 2192,
        "watering_time": "2019-02-07T08:00:00.000Z"
    }
]
```

---
### DELETE /api/plants/{plantId}/schedule
**JWT token required**
* Deletes the entire schedule for the selected plant

---
### DELETE /api/plants/{plantId}/schedule/{wateringId}
**JWT token required**
* Deletes a specific watering time from the schedule
* Returns the updated watering schedule
