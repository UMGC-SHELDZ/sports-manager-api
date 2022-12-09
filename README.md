# sports-manager-api

This is an API for managing the players of different sports teams. It can support players for multiple teams and multiple sports.

## Install

    

## Run the app

    ts-node src/app.ts

# REST API

The REST API to the app is described below.

## Create a new manager

### Request

`POST /manager`

    curl -i -H 'Accept: application/json' http://localhost:4000
    
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

