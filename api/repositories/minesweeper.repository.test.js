const repo = require('./minesweeper.repository')

test('should create matrix', () => {
    const width = 20
    const height = 20
    const matrix = repo.createGame(width, height)
    expect(matrix.length).toBe(height)
    expect(matrix[0].length).toBe(width)
})

test('should fill with mines', () => {
    const width = 20
    const height = 20
    const mines = 20
    let matrix = repo.createGame(width, height)
    matrix = repo.fillMines(matrix, mines, matrix[0][0])
    expect(matrix.reduce((a, b) => (a + b.filter(b2 => b2.mine).length), 0))
        .toBe(mines)
})

test('should detect winning', () => {
    const width = 20
    const height = 20
    const mines = 20
    let matrix = repo.createGame(width, height)
    matrix = repo.fillMines(
        matrix,
        mines,
        matrix[0][0]
    )
    matrix.forEach(m1 => {
        m1.forEach(m2 => {
            if (!m2.mine) {
                m2.open = true
            }
        })
    })
    const won = repo.verifyWinning(matrix)
    expect(won).toBeTruthy()
})

test('should open selected col', () => {
    const width = 20
    const height = 20
    const mines = 20
    const x = 5
    const y = 5
    let matrix = repo.createGame(width, height)
    matrix = repo.openSelectedCol(matrix, matrix[y][x])
    expect(matrix[y][x].open).toBeTruthy()
})

test('should fill with numbers', () => {
    const width = 20
    const height = 20
    const mines = 20
    const y = 5
    const x = 5
    let matrix = repo.createGame(width, height)
    matrix = repo.fillMines(matrix, mines, matrix[y][x])
    matrix = repo.fillWithNumbers(matrix)
    const col = matrix[y].find(m2 => (m2.count > 0))
    let mineCount = 0
    for (let j = (col.y - 1); j <= (col.y + 1); j++) {
        for (let i = (col.x == 0 ? 0 : col.x - 1); i <= (col.x + 1); i++) {
            if (matrix[j][i].mine) {
                mineCount++
            }
        }
    }
    expect(mineCount).toBe(col.count)
})