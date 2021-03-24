const   path = require('path'),
        appRoot = require('app-root-path'),
        authRepository = require(path.resolve(appRoot.path, 'api', 'repositories', 'auth.repository'))

function isAuthenticated(req, res, next) {
    const respVerif = authRepository.verifyJWT(req.token)
    if (respVerif) {
        return authRepository
            .getUserByUserId(respVerif._id)
            .then((data) => {
                if (data) {
                    req.user = data
                    return next()
                } else {
                    res.status(401)
                        .send({
                            message: 'No permission to perform this action'
                        })
                }
            })
            .catch((error) => {
                res.status(401)
                    .send({
                        message: 'No permission to perform this action'
                    })
            })

    } else {
        res.status(401)
            .send({
                message: 'No permission to perform this action'
            })
    }
}

exports.isAuthenticated = isAuthenticated