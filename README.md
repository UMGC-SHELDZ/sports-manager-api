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

    Status: 201 Created
    Body:
    {
    "userName": "NewValue",
    "firstName": "NewValue",
    "lastName": "NewValue",
    "id": "id"
    }
