# sports-manager-api

This is an API for managing the players of different sports teams. It can support players for multiple teams and multiple sports.

## Install

    

## Run the app

    ts-node src/app.ts

# REST API

The REST API to the app is described below.

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

### Response

    Status: 201 Created
    Body:
    {
    "userName": "TestUser",
    "firstName": "Manager",
    "lastName": "One",
    "id": "63933d28459cefadd34fdc35"
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
        
### Response

    Status: 202 Accepted
    Body:
    {
    "userName": "NewValue",
    "firstName": "NewValue",
    "lastName": "NewValue",
    "id": "id"
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

Adds a new player to the database

### Request

`POST /player`

    'Accept: application/json' http://localhost:4000
    
    

### Response

    Status: 201 Created
    Body:
    

## Update a player

Changes a field of a player.

Bearer token is required for this route.

'id' should be the id of the player you want to update.
Include in the body the key you want to change, along with the new value.

### Request

`PUT /player`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 202 Accepted
    Body:
    
    
## Get all players

Returns an array of all players

### Request

`GET /player`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 200 OK
    Body:
    

## Get a player by id

'id' in the URL should be the id of the player you want to get.

### Request

`GET /player/id`
    
    'Accept: application/json' http://localhost:4000
    
      
### Response (if found)

    Status: 200 OK
    Body:
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    

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
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    

## Get players by team

Gets all players by a specific team id

'id' in the URL should be the id of the team you want to get players for.

### Request

`DELETE /player/team/id`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response (if found)

    Status: 202 Accepted
    Body:
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    
    
    
    
    
    
    
## Create a new team

Adds a new team to the database

### Request

`POST /team`

    'Accept: application/json' http://localhost:4000
    

### Response

    Status: 201 Created
    Body:
    

## Update a team

Changes a field of a team.

Bearer token is required for this route.

'id' should be the id of the team you want to update.
Include in the body the key you want to change, along with the new value.

### Request

`PUT /team`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 202 Accepted
    Body:
    
    
## Get all teams

Returns an array of all teams

### Request

`GET /team`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 200 OK
    Body:
    

## Get a team by id

'id' in the URL should be the id of the team you want to get.

### Request

`GET /team/id`
    
    'Accept: application/json' http://localhost:4000
    
      
### Response (if found)

    Status: 200 OK
    Body:
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    

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
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    
    
## Get teams by sport

Gets all teams by a specific sport id

'id' in the URL should be the id of the sport you want to get teams for.

### Request

`DELETE /team/player/id`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response (if found)

    Status: 202 Accepted
    Body:
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:    
    
    
    
    
    
    
## Create a new sport

Adds a new sport to the database

### Request

`POST /sport`

    'Accept: application/json' http://localhost:4000
    

### Response

    Status: 201 Created
    Body:
    

## Update a sport

Changes a field of a sport.

Bearer token is required for this route.

'id' should be the id of the sport you want to update.
Include in the body the key you want to change, along with the new value.

### Request

`PUT /sport`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 202 Accepted
    Body:
    
    
## Get all sports

Returns an array of all sports

### Request

`GET /sport`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 200 OK
    Body:
    

## Get a sport by id

'id' in the URL should be the id of the sport you want to get.

### Request

`GET /sport/id`
    
    'Accept: application/json' http://localhost:4000
    
      
### Response (if found)

    Status: 200 OK
    Body:
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    

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
    
    
### Response (if not found)

    Status: 404 Not Found
    Body:
    
    
