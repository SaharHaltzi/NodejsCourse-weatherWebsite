const request = require('request');

const forecast = (latitude, longtitude, callback) => {

    const url = 'https://api.darksky.net/forecast/0d42d24bb12e783fe94c102856b8b9ee/'
                    + latitude+ ',' + longtitude + '?units=si&lang=en';

    request({url, json: true}, (error, {body}) =>    {
        if(error){
            callback('Unable to connect to weather service...');
        }else if(body.error) {
            callback('Unable to find location...');

        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out.'
            + ' There is a '+ body.currently.precipProbability + '% chance for rain. '
            + 'Today the high temperature is '+ body.daily.data[0].temperatureHigh
            +' and the low temperature is '+ body.daily.data[0].temperatureLow);
        }
    });
}

module.exports = {
    forecast: forecast
}