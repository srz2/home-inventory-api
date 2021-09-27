const config = require('./config')
const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors({
        origin: "http://localhost:3000"
    })
)

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

const routeItems = require('./routes/items')

const mongoUsername = config.MONGO.USERNAME;
const mongoPassword = config.MONGO.PASSWORD;
const mongoDatabase = config.MONGO.DATABASE;
mongoose.connect(`mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.5398r.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((results) => {
    console.log('Connected to database');
}).catch((error) => {
    console.log('Failed to connect to database');
});

app.use('/items', routeItems);

app.use('/', (req, res, next) => {
    res.status(200).send('<h1>Home Inventory API</h1><h2>Go to <a href="/items">Items</a> to view all items</h2>')
})

module.exports = app