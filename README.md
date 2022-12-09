# sports-manager-api

This is an API for managing the players of different sports teams. It can support players for multiple teams and multiple sports.

## Install

    yarn install
    
    Install MondoDB: https://www.mongodb.com/docs/manual/administration/install-community/
    
    Start MongoDB Shell: https://www.mongodb.com/docs/v4.4/mongo/

## Run the app

    yarn start-dev

# Security

Passwords are saved using a bcrypt hash and JSON Web Tokens are required to access update and delete routes.
To get a token, use the Login route and enter a manager's username and password.


# API Routes

The available routes are described below

## Admin Check

Check if the API is running or not

### Request

`GET /admin`

    'Accept: application/json' http://localhost:4000

### Response (if server running)

    Status: 200 Created
    Body:
    {
    "serverResp": "running"
    }
    
    


## Login

Enter a username and Manager's username and password, used to get a token to access all routes.

### Request

`POST /manager/login`

    'Accept: application/json' http://localhost:4000
    {
    "userName" : "value",
    "password" : "value"
    }

### Response (if successful login)

    Status: 200 Created
    Body:
    {
    "userId": "value",
    "token": "token"
    }

### Response (if unsuccessful login)

    Status: 401 Unauthorized
    Body:
    {
    "message": "Invalid username or password!"
    }


## Create a new manager

Adds a new manager to the database

### Request

`POST /manager`

    'Accept: application/json' http://localhost:4000
    
    {
    "userName" : "TestUser",
    "password" : "password",
    "firstName" : "Manager",
    "lastName" : "One"
    }

### Response (if username does not already exist)

    Status: 201 Created
    Body:
    {
    "userName": "TestUser",
    "firstName": "Manager",
    "lastName": "One",
    "id": "63933d28459cefadd34fdc35"
    }
    
### Response (if username already exist)

    Status: 409 Conflict
    Body:
    {
    "message": "Username already exists"
    }
    
    

## Update a manager

Changes a field of a manager.

Bearer token is required for this route.

'id' should be the id of the manager you want to update.
Include in the body the key you want to change, along with the new value.

### Request

`PUT /manager`
    
    'Accept: application/json' http://localhost:4000
    {
    "userName": "NewValue",
    "firstName": "NewValue",
    "lastName": "NewValue",
    "id": "id"
    }
        
### Response (if manager found)

    Status: 202 Accepted
    Body:
    {
    "userName": "NewValue",
    "firstName": "NewValue",
    "lastName": "NewValue",
    "id": "id"
    }
    
### Response (if manager not found)
    Status: 202 Accepted
    Body:
    {
    "message": "Manager not found."
    }
    
## Get all managers

Returns an array of all managers

### Request

`GET /manager`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 200 OK
    Body:
    [managers]

## Get a manager by id

'id' in the URL should be the id of the manager you want to get.

### Request

`GET /manager/id`
    
    'Accept: application/json' http://localhost:4000
    
      
### Response (if found)

    Status: 200 OK
    Body:
    {
    "userName": "value",
    "firstName": "value",
    "lastName": "value",
    "id": "id"
    }
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Manager not found."
    }

## Delete a manager

Deletes a manager by id

Bearer token is required for this route.

'id' in the URL should be the id of the manager you want to delete.

### Request

`DELETE /manager/id`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response (if found)

    Status: 202 Accepted
    Body:
    {
    "message": "Success"
    }
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Manager not found."
    }







## Create a new player

Adds a new player to the database.

Bearer token is required for this route.

### Request

`POST /player`

    'Accept: application/json' http://localhost:4000
    {
    "firstName" : "value",
    "lastName" : "value",
    "team" : "value (team id)",
    "position" : "value",
    "playerNumber" : value
    }
    

### Response

    Status: 201 Created
    Body:
    {
    "firstName": "value",
    "lastName": "value",
    "team": "value",
    "position": "value",
    "playerNumber": value,
    "_id": "value",
    "__v": 0
}

## Update a player

Changes a field of a player.

Bearer token is required for this route.

'id' should be the id of the player you want to update.
Include in the body the key you want to change, along with the new value.

### Request

`PUT /player`
    
    'Accept: application/json' http://localhost:4000
    {
    "firstName": "newValue",
    "lastName": "newValue",
    "team": "newValue",
    "position": "newValue",
    "playerNumber": newValue,
    "id": "id"
    }
        
### Response (if player found)

    Status: 202 Accepted
    Body:
    {
    "firstName": "newValue",
    "lastName": "newValue",
    "team": "newValue",
    "position": "newValue",
    "playerNumber": newValue,
    "id": "id"
    }
    
### Response (if player not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Player not found."
    }
    
    
## Get all players

Returns an array of all players

### Request

`GET /player`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 200 OK
    Body:
    [players]
    

## Get a player by id

'id' in the URL should be the id of the player you want to get.

### Request

`GET /player/id`
    
    'Accept: application/json' http://localhost:4000
    
      
### Response (if found)

    Status: 200 OK
    Body:
    {
    "_id": "value",
    "firstName": "value",
    "lastName": "value",
    "team": "value",
    "position": "value",
    "playerNumber": value,
    "__v": 0
}
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Player not found"
    }
    

## Delete a player

Deletes a player by id

Bearer token is required for this route.

'id' in the URL should be the id of the player you want to delete.

### Request

`DELETE /player/id`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response (if found)

    Status: 202 Accepted
    Body:
    {
    "message": "Success"
    }
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Player not found."
    }
    

## Get players by team

Gets all players by a specific team id

'id' in the URL should be the id of the team you want to get players for.

### Request

`DELETE /player/team/id`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response (if found)

    Status: 202 Accepted
    Body:
    [players]
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "None Found"
    }
    
    
    
    
    
    
## Create a new team

Adds a new team to the database.

Bearer token is required for this route.

### Request

`POST /team`

    'Accept: application/json' http://localhost:4000
    {
    "teamName" : "value",
    "sport" : "value (sport id)",
    "manager" : "value (manager id)"
    }

### Response

    Status: 201 Created
    Body:
    {
    "teamName": "value",
    "sport": "value",
    "manager": "value",
    "_id": "value",
    "__v": 0
    }

## Update a team

Changes a field of a team.

Bearer token is required for this route.

'id' should be the id of the team you want to update.
Include in the body the key you want to change, along with the new value.

### Request

`PUT /team`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response (if found)

    Status: 202 Accepted
    Body:
    {
    "teamName": "newValue",
    "sport": "newValue (sport id)",
    "manager": "newValue (manager id)",
    "id": "id"
    }
    
### Response (if not found)
    
    Status: 404 Not Found
    Body:
    {
    "message": "Player not found."
    }
    
## Get all teams

Returns an array of all teams

### Request

`GET /team`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 200 OK
    Body:
    [teams]
    

## Get a team by id

'id' in the URL should be the id of the team you want to get.

### Request

`GET /team/id`
    
    'Accept: application/json' http://localhost:4000
    
      
### Response (if found)

    Status: 200 OK
    Body:
    {
    "_id": "value",
    "teamName": "value",
    "sport": "value",
    "manager": "value",
    "__v": 0
    }
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Team not found"
    }

## Delete a team

Deletes a team by id

Bearer token is required for this route.

'id' in the URL should be the id of the team you want to delete.

### Request

`DELETE /team/id`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response (if found)

    Status: 202 Accepted
    Body:
    {
    "message": "Success"
    }
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Team not found."
    }
    
    
## Get teams by sport

Gets all teams by a specific sport id

'id' in the URL should be the id of the sport you want to get teams for.

### Request

`DELETE /team/sport/id`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 202 Accepted
    Body:
    [teams]
    
    
    
    
    
    
## Create a new sport

Adds a new sport to the database.

Bearer token is required for this route.

### Request

`POST /sport`

    'Accept: application/json' http://localhost:4000
    {
    "sportName" : "value"
    }

### Response

    Status: 201 Created
    Body:
    {
    "sportName": "value",
    "_id": "value",
    "__v": 0
    }
    

## Update a sport

Changes a field of a sport.

Bearer token is required for this route.

'id' should be the id of the sport you want to update.
Include in the body the key you want to change, along with the new value.

### Request

`PUT /sport`
    
    'Accept: application/json' http://localhost:4000
    {
    "sportName": "newValue",
    "id": "id"
    }
        
### Response (if found)

    Status: 202 Accepted
    Body:
    {
    "sportName": "THE CATS",
    "id": "63935ad3f7874b4c9cf40c25"
    }
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Player not found."
    }
    
## Get all sports

Returns an array of all sports

### Request

`GET /sport`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 200 OK
    Body:
    [sports]

## Get a sport by id

'id' in the URL should be the id of the sport you want to get.

### Request

`GET /sport/id`
    
    'Accept: application/json' http://localhost:4000
    
      
### Response (if found)

    Status: 200 OK
    Body:
    {
    "_id": "value",
    "sportName": "value",
    "__v": 0
    }
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Sport not found"
    }
    

## Delete a sport

Deletes a sport by id

Bearer token is required for this route.

'id' in the URL should be the id of the sport you want to delete.

### Request

`DELETE /sport/id`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response (if found)

    Status: 202 Accepted
    Body:
    {
    "message": "Success"
    }
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    {
    "message": "Sport not found."
    }
    
    
