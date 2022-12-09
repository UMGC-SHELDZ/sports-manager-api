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
    
## 

### Request

`PUT /manager`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 
    Body:
    
## 

### Request

`PUT /manager`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 
    Body:
   
## 

### Request

`PUT /manager`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 
    Body:
  
## 

### Request

`PUT /manager`
    
    'Accept: application/json' http://localhost:4000
    
        
### Response

    Status: 
    Body:
