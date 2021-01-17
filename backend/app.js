const express = require('express');

const app = express();

app.use((req, res, next) => {
    next()
})

app.use((req, res, next) => {
    console.log(req)
    res.send('Hello2')
})

module.exports = app