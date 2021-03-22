const   express = require('express'),
        router = express(),
        path = require('path'),
        appRoot = require('app-root-path'),
        minesweeper = require(path.resolve(appRoot.path, 'api', 'routes', 'minesweeper.routes'))

router.use('/minesweeper', minesweeper)

module.exports = router