const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Headers, Access-Control-Request-Method, content-type')
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, OPTIONS, HEAD")
    next();
})

let posts = [
    {
        id: 'blaId2323',
        title: "Title",
        content: "Inner content of post"
    },
    {
        id: "fdfdf2323",
        title: "Title2",
        content: "Inner content of post"
    }
]

app.post('/api/posts', (req, res, next) => {
    const post = req.body
    console.log(post)
    posts.push({
        ...post,
        id: Math.random().toString(36).substring(7)
    })
    res.status(201).json()
})

app.get('/api/posts', (req, res, next) => {
    res.status(200).json({
        message: "Sending posts",
        posts
    })
})

module.exports = app