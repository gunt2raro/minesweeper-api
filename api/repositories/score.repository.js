const   DataStore = require('nedb'),
        path = require('path'),
        appRoot = require('app-root-path')

const db = new DataStore({
    filename: path.resolve(appRoot.path, 'api', 'dbs', 'scores.db')
})
db.loadDatabase();

function getAllByUserAndType(userId, gameType) {
    return new Promise((res, rej) => db.find(
            {
                "user._id": userId,
                "gameType": gameType
            }
        )
        .sort({ time: 1 })
        .exec((err, result) => 
            err? rej(err): res(result)
        )
    )
}

function create(score) {
    return new Promise((res, rej) => db.insert(
        score,
        (err, result) => 
            err ? rej(err): res(result)
    ))
}

exports.create = create
exports.getAllByUserAndType = getAllByUserAndType