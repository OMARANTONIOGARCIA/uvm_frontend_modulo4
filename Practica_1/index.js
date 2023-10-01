const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const weatherstack = require('./src/utils/weatherstack')

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.urlencoded({ extended: true }));

app.get('', (req, res) => {
    res.render('index', {
        title: 'App Web Clima',
        name: 'Antonio'
    })
});


app.get('/weather', (req, res) => {
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

app.get('*', (req, res) => {
    res.render('404', {
        title: 'App Web Clima',
        name: 'Antonio',
        errorMessage: 'Page not found.'
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});