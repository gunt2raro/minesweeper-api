const   express = require('express'),
        router = express(),
        path = require('path'),
        appRoot = require('app-root-path'),
        scoreRepository = require(path.resolve(appRoot.path, 'api', 'repositories', 'score.repository'))

router.post('/', (req, res) => {
    res
        .status(200)
        .send({
            data: null
        })
})


router.get('/', (req, res) => {
    res
        .status(200)
        .send({
            data: null
        })
})


router.get('/:id', (req, res) => {
    res
        .status(200)
        .send({
            data: null
        })
})

module.exports = router