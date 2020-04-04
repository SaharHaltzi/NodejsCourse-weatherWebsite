const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

//Define path for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express();
const port = process.env.PORT || 3000;

//Setup static directory to serve
app.use(express.static(publicDirectory));

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {title: 'Weather App', name: 'Sahar Metzger'}); //render one of our views because we defined it in app.set down below
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Me', name: 'Sahar Metzger'}); //render one of our views because we defined it in app.set down below
});

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help Page', name: 'Sahar Metzger' , message: 'This is a help message!'}); //render one of our views because we defined it in app.set down below
});

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'address parameter must be provider!'
        })
    }

    geocode.geoCode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        console.log(error);
        if(error){
            console.log(error);
            return res.send({error});
        }

        forecast.forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
});

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term' 
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    });
})


app.get('/help/*', (req, res) => {
    res.render('404page', 
    {title: '404',
     name: 'Sahar Metzger', 
     errorMessage: 'Article not found :/'})
});
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
         name: 'Sahar Metzger',
        errorMessage: 'Page not found :/'}
        )
});

app.listen(port, () => {
    console.log('Server is up on port '+ port);
})