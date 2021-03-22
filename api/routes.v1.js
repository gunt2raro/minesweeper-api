const   express = require('express'),
        router = express(),
        path = require('path'),
        appRoot = require('app-root-path'),
        auth = require(path.resolve(appRoot.path, 'api', 'routes', 'auth.routes')),
        scores = require(path.resolve(appRoot.path, 'api', 'routes', 'scores.routes')),
        minesweeper = require(path.resolve(appRoot.path, 'api', 'routes', 'minesweeper.routes'))

router.use('/auth', auth)
router.use('/scores', scores)
router.use('/minesweeper', minesweeper)

module.exports = router