const path = require('path');
const express = require('express');
const weatherstack = require('./utils/weatherstack')
const serverless = require("serverless-http");
const hbs = require('hbs');
const app = express();
const router = express.Router();


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath))
app.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('index', {
        title: 'App Web Clima',
        name: 'Antonio'
    })
});

router.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Ingresa Ciudad!'
        })
    }
    weatherstack(req.query.address, (error, request = {}) => {
        if (error) {
            return res.send({ error })
        }
        return res.send(request)
    })
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'App Web Clima',
        name: 'Antonio',
        errorMessage: 'Page not found.'
    })
});

/*
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log('Server is up on port ' + port)
});
*/

app.use(`/.netlify/functions/api`, router);
module.exports = app;
module.exports.handler = serverless(app);