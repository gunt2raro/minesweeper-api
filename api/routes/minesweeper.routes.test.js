const supertest = require('supertest')
const server = require('../server')
const request = supertest(server)

test('should create a new game', async () => {
    const res = await request
        .post('/api/v1/minesweeper')
        .send({
            width: 20,
            height: 20,
        })
    expect(res.statusCode).toEqual(201)
    expect(res.body.data).toBeDefined()
    expect(res.body.data.length).toBe(20)
    expect(res.body.data[0].length).toBe(20)
})

test('should fill with mines', async () => {
    const mines = 20
    const res = await request
        .post('/api/v1/minesweeper')
        .send({
            width: 20,
            height: 20,
        })
    let game = res.body.data
    const res2 = await request
        .put('/api/v1/minesweeper/fill')
        .send({
            game: game,
            mines: mines,
            cel: {
                y: 5,
                x: 5,
            }
        })
    game = res2.body.data
    expect(res2.statusCode).toEqual(200)
    expect(game.reduce((a, b) => (a + b.filter(b2 => b2.mine).length), 0))
        .toBe(mines)
})

test('should click send click on cel and verify winning', async () => {
    const mines = 20
    const x = 5
    const y = 5
    const res = await request
        .post('/api/v1/minesweeper')
        .send({
            width: 20,
            height: 20,
        })
    let game = res.body.data
    const res2 = await request
        .put('/api/v1/minesweeper/fill')
        .send({
            game: game,
            mines: mines,
            cel: {
                y: y,
                x: x,
            }
        })
    game = res2.body.data
    game.forEach(m1 => {
        m1.forEach(m2 => {
            if (!m2.mine) {
                m2.open = true
            }
        })
    })
    const res3 = await request
        .put('/api/v1/minesweeper/cel')
        .send({
            game: game,
            cel: game[y][x]
        })
    expect(res3.statusCode).toEqual(200)
    expect(res3.body.winner).toBeTruthy()
})