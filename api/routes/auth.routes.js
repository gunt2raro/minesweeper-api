const   express = require('express'),
        router = express(),
        path = require('path'),
        appRoot = require('app-root-path'),
        authRepository = require(path.resolve(appRoot.path, 'api', 'repositories', 'auth.repository'))

router.post('/login', (req, res) => {
    authRepository
        .login(req.body)
        .then(data => {
            res
                .status(200)
                .send({
                    data: data
                })
        })
})

router.post('/register', (req, res) => {
    authRepository
        .getUserByUserName(req.body.username)
        .then(data => {
            if(data) {
                res
                    .status(400)
                    .send({
                        message: "Username already taken"
                    })
            } else {
                authRepository
                    .register(req.body)
                    .then(data2 => {
                        if(data2) {
                            res
                                .status(200)
                                .send({
                                    data: {
                                        username: data2.username
                                    }
                                })
                        }
                    })
            }
        })
})

module.exports = router