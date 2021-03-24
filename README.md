# Minesweeper API

## Node version

node >= 13.14.0
npm >= 6.14.4

## Run the app

    npm run start:dev

## Test the app 

    npm run test

## DB

It uses NeDB database, a mongodb like db that requires no additional installation as it is a regular npm package.


## REST API

It is divided by 3 modules; Minesweeper, Scores and Auth

### Minesweeper

Create a new game with dimensions :

    POST /api/v1/minesweeper
    {
        "height": 20, 
        "width": 20
    }

Returns 

    {
        "data": [
            [ { "x": 0, "y": 0 } ... ]
            ...
        ]
    }

Fill with mines and numbers after clicking a cel:

    PUT /api/v1/minesweeper/fill
    {
        "game": [
            [ { "x": 0, "y": 0 } ... ]
            ...
        ].
        "cel": { "x": 0, "y": 0 }
    }

Returns 

    {
        "data": [
            [ { "x": 0, "y": 0, "mine": false, "count": 0, "open": false } ... ]
            ...
        ]
    }

Click on Cel to discover and verify winning:

    PUT /api/v1/minesweeper/cel
    {
        "game": [
            [ { "x": 0, "y": 0, "mine": false, "count": 0, "open": false } ... ]
            ...
        ].
        "cel": { "x": 0, "y": 0 }
    }

Returns 

    {
        "data": [
            [ { "x": 0, "y": 0, "mine": false, "count": 0, "open": false } ... ]
            ...
        ],
        "winner": true/false
    }

### Auth

Register User; password is saved by bcrypt 

    POST /api/v1/auth/register
    {
        "username": "",
        "password": ""
    }

returns

    {
        "_id": "",
        "username: ""
    }

Login User

    POST /api/v1/auth/login

    {
        "username": "",
        "password": ""
    }

returns 

    {
        "_id": "",
        "username": "",
        "token": ""
    }

### Scores 

Save a score, you need to have permission to perform this action with jwt token

    POST /api/v1/scores/
    headers: {
        Authorization: "Bearer JWT"
    }
    {
        "time": "HH:mm:ss",
        "gameType" : "EASY / NORMAL / HARD",
        "user" : {
            "_id": "",
            "username": ""
        }
    }

returns 
    
    {
        "_id": "",
        "time": "HH:mm:ss",
        "gameType" : "EASY / NORMAL / HARD",
        "user" : {
            "_id": "",
            "username": ""
        }
    }

Get scores by user 

    GET /api/v1/scores?gameType={EASY / NORMAL / HARD}
    headers: {
        Authorization: "Bearer JWT"
    }

returns 

    [
        {
            "_id": "",
            "time": "HH:mm:ss",
            "gameType" : "EASY / NORMAL / HARD",
            "user" : {
                "_id": "",
                "username": ""
            }
        }
        ...
    ]
    
## Production Server

https://minesweeper-test-api.herokuapp.com/
