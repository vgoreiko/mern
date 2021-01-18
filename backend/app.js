const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const winston = require('winston')
const expressWinston = require('express-winston')
const postsRoutes = require('./routes/posts')

dotenv.config()
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }));

app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Headers, Access-Control-Request-Method, content-type')
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, OPTIONS, HEAD, DELETE")
    next();
})

const mongoConnectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@shopcluster.qj0ue.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
console.log(mongoConnectionString)
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@shopcluster.qj0ue.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.use('/api/posts',postsRoutes)

})

module.exports = app