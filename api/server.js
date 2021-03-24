const http = require('http'),
    bodyParser = require('body-parser'),
    bearerToken = require('express-bearer-token'),
    express = require('express'),
    cors = require('cors'),
    router = express()

const server = http.createServer(router)

router.use(bodyParser.json({ 
    limit: '50mb', 
    extended: true 
}));
router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(cors("*"))
router.use(bearerToken())
router.use('/api/v1', require('./routes.v1'))

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0")

module.exports = server