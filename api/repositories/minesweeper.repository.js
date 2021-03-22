
// createGame
// @param width: width of the game matrix
// @param height: height of the game matrix
// @returns a game matrix
function createGame(width, height) {
    let matrixOf = []
    for (let i = 0; i < height; i++) {
        let widthArray = []
        for (let j = 0; j < width; j++) {
            widthArray.push({
                y: i,
                x: j,
                open: false,
                mine: false
            })
        }
        matrixOf.push(widthArray)
    }
    return matrixOf
}

// fillMines
// @param game: Game matrix
// @param mines: number of mines on the game matrix
// @param cel: cel clicked
// @returns agame matrix
function fillMines(game, mines, cel) {
    if (mines < (game[0].length * game.length)) {
        let minesCount = 0
        while (minesCount < mines) {
            let startRow = Math.floor(
                Math.random() * game.length
            )
            let startCol = Math.floor(
                Math.random() * game[0].length
            )
            if (
                startRow != cel.y &&
                startCol != cel.x &&
                game[startRow][startCol].mine == false
            ) {
                game[startRow][startCol].mine = true
                minesCount++
            }
        }
        return game
    } return game
}

// fillWithNumbers
// will fill the matrix with the numbers 
// that hint the amount of bombs on the perimeter
// @param game: Game matrix
// @returns a game matrix
function fillWithNumbers(game) {
    const width = game[0].length
    const height = game.length
    game.forEach(r => {
        r.forEach(g => {
            if (!g.mine) {
                const startIndexX = (
                    g.x > 0 ? -1 : 0
                )
                const startindexY = (
                    g.y > 0 ? -1 : 0
                )
                let bombCount = 0
                for (let j = (g.y + startindexY); j <= (g.y + 1) && j < height; j++) {
                    for (let i = (g.x + startIndexX); i <= (g.x + 1) && i < width; i++) {
                        if (game[j][i].mine) {
                            bombCount++;
                        }
                    }
                }
                g.count = bombCount
            }
        })
    })
    return game
}

// discoverEmptySpace
// @param game: Game matrix
// @param cel: cel clicked
// @returns a game matrix
function discoverEmptySpace(game, cel) {
    // 4th cuadrant
    for(let i=cel.x; i < game[0].length; i++ ) {
        for(let j=cel.y; j < game.length; j++ ) {
            if(
                game[j][i].mine
            ) {
                break;
            } else {
                game[j][i].open = true
            }
        }
    }
    // 3rd cuadrant
    for(let i=cel.x; i >= 0; i-- ) {
        for(let j=cel.y; j < game.length; j++ ) {
            if(
                game[j][i].mine
            ) {
                break;
            } else {
                game[j][i].open = true
            }
        }
    }
    // 1st cuadrant
    for(let i=cel.x; i >= 0; i-- ) {
        for(let j=cel.y; j >= 0; j-- ) {
            if(
                game[j][i].mine
            ) {
                break;
            } else {
                game[j][i].open = true
            }
        }
    }
    // 2nd cuadrant
    for(let i=cel.x; i < game[0].length; i++ ) {
        for(let j=cel.y; j >= 0; j-- ) {
            if(
                game[j][i].mine
            ) {
                break;
            } else {
                game[j][i].open = true
            }
        }
    }
    return game

}

// openSelectedCol
// @param game: game matrix
// @param cel: cel clicked
// @returns a game matrix
function openSelectedCol(game, cel) {
    game.forEach(g1 => {
        g1.forEach(g2 => {
            if (g2.x == cel.x && g2.y == cel.y) {
                g2.open = true
            }
        })
    })
    return game
}

function verifyWinning(game) {
    return game
        .every(g1 => 
            g1
            .filter(g2 => !g2.mine)
            .every(g2 => g2.open)
        )
}

exports.fillMines = fillMines
exports.createGame = createGame
exports.verifyWinning = verifyWinning
exports.openSelectedCol = openSelectedCol
exports.fillWithNumbers = fillWithNumbers
exports.discoverEmptySpace = discoverEmptySpace