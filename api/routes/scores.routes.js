const   express = require('express'),
        router = express(),
        path = require('path'),
        urlLib = require('url'),
        appRoot = require('app-root-path'),
        scoreRepository = require(path.resolve(appRoot.path, 'api', 'repositories', 'score.repository')),
        authMiddleware = require(path.resolve(appRoot.path, 'api', 'middleware', 'auth.middleware'))

router.post('/', authMiddleware.isAuthenticated, (req, res) => {
    scoreRepository
        .create({
            time: req.body.time,
            gameType: req.body.gameType,
            user: req.user,
        })
        .then((data) => {
            if(data) {
                res
                    .status(201)
                    .send({
                        data: data
                    })
            } else {
                res
                    .status(400)
                    .send({
                        message: error
                    })
            }
        })
        .catch((error) => {
            res
                .status(400)
                .send({
                    message: error
                })
        })
})

router.get('/',  authMiddleware.isAuthenticated, (req, res) => {
    var url_parts = urlLib.parse(req.url, true)
    scoreRepository
        .getAllByUserAndType(
            req.user._id, 
            url_parts.query.gameType
        )
        .then((data) => {
            res
                .status(200)
                .send({
                    data: data
                })
        })
})

module.exports = router