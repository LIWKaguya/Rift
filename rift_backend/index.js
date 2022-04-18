const express = require('express')
const app = express()

app.get('/', (_, res) => {
    res.send('Hi')
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})