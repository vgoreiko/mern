const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Post = require('./models/post')

dotenv.config()
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Headers, Access-Control-Request-Method, content-type')
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, OPTIONS, HEAD")
    next();
})

const mongoConnectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@shopcluster.qj0ue.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@shopcluster.qj0ue.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.post('/api/posts', (req, res, next) => {
            const post = new Post({
                title: req.body.title,
                content: req.body.content
            })
            post.save((err, post) => {
                if(err) return res.status(400).json()
                res.status(201).json()
            })
        })
        
        app.get('/api/posts', async (req, res, next) => {
            const posts = await Post.find({})
            res.status(200).json({
                message: "Sending posts",
                posts
            })
        })
})



module.exports = app