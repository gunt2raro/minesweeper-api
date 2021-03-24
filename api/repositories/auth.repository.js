const   DataStore = require('nedb'),
        path = require('path'),
        appRoot = require('app-root-path'),
        jwt = require('jsonwebtoken'),
        bcrypt = require('bcrypt-nodejs')

const secretJWTSeed = "1974niPjL8gfA3kFIUeV" // this should be secreat if super important!

const db = new DataStore({
    filename: path.resolve(appRoot.path, 'api', 'dbs', 'auth.db')
})
db.loadDatabase();

function getUserByUserName(username) {
    return new Promise((res, rej) => db.findOne(
        {
            username: username
        },
        (err, result) => 
            err? rej(err): res(result)
    ))
}

function getUserByUserId(id) {
    return new Promise((res, rej) => db.findOne(
        {
            _id: id
        },
        (err, result) => 
            err? rej(err): res(result)
    ))
}

function login(user) {
    return getUserByUserName(user.username)
        .then((data) => {
            if(data) {
                if(bcrypt.compareSync(user.password, data.password)) {
                    return {
                        username: data.username,
                        _id: data._id,
                        token: jwt.sign({
                            username: data.username,
                            _id: data._id
                        }, secretJWTSeed)
                    }
                }
            } else {
                return null
            }
        })
        .catch(error => {
            return null
        })
}

function verifyJWT(token) {
    return jwt.verify(token, secretJWTSeed);
}

function register(user) {
    user.password = bcrypt.hashSync(user.password)
    return new Promise((res, rej) => db.insert(
        user,
        (err, result) => 
            err ? rej(err): res(result)
    ))
}

exports.login = login
exports.register = register
exports.verifyJWT = verifyJWT
exports.getUserByUserId = getUserByUserId
exports.getUserByUserName = getUserByUserName