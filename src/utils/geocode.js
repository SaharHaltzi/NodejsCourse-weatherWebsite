const request  = require('request');


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?access_token=pk.eyJ1Ijoic2FoYXJtZXR6Z2VyIiwiYSI6ImNrOGJsMnNwdTBjcmozbW1qZmd4aWNzdHcifQ.jt0waWalzHcyrHVKWEjuiw&limit=1';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!'); //undefined response by default.
        }else if(body.features.length === 0) {
            callback('Unable to find longitude and latitude.');
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = {
    geoCode: geoCode
}