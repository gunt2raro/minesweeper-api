const   express = require('express'),
        router = express(),
        path = require('path'),
        appRoot = require('app-root-path'),
        minesweeperRepository = require(path.resolve(appRoot.path, 'api', 'repositories', 'minesweeper.repository'))

router.post('/', (req, res) => {
    const errors = []
    if(!('height' in req.body)) { 
        errors.push("Please include height propierty")
    }
    if(!('width' in req.body)) {
        errors.push("Please include width propierty")
    }
    if(errors.length == 0) {
        res
            .status(201)
            .send({
                data: minesweeperRepository
                    .createGame(
                        req.body.width, 
                        req.body.height
                    )
            })
    } else {
        res 
            .status(400)
            .send({
                errors: errors
            })
    }
})

router.put('/fill', (req, res) => {
    const errors = []
    if(!('mines' in req.body)) { 
        errors.push("Please include mines propierty")
    }
    if(!('game' in req.body)) { 
        errors.push("Please include game propierty")
    }
    if(!('x' in req.body.cel)) { 
        errors.push("Please include x propierty")
    }
    if(!('y' in req.body.cel)) { 
        errors.push("Please include y propierty")
    }
    if(errors.length == 0) {
        if(
            req.body.mines >= (
                req.body.game[0].length 
                * req.body.game.length
            )
        ) {
            errors.push("mines should be less than the whole area")
        }
    }
    if(errors.length == 0) {
        let newGame = minesweeperRepository
            .fillMines(
                req.body.game,
                req.body.mines,
                req.body.cel
            )
        newGame = minesweeperRepository
            .openSelectedCol(
                newGame, 
                req.body.cel
            )
        newGame = minesweeperRepository
            .fillWithNumbers(
                newGame
            )
        res
            .status(200)
            .send({
                data: newGame
            })
    } else {
        res 
            .status(400)
            .send({
                errors: errors
            })
    }
})


router.put('/cel', (req, res) => {
    let newGame = minesweeperRepository
        .discoverEmptySpace(
            req.body.game,
            req.body.cel
        )
    let verify = minesweeperRepository
        .verifyWinning(
            req.body.game
        )
    res
        .status(200)
        .send({
            data: newGame,
            winner: verify
        })

})

module.exports = router