const request = require('request')

const weatherstack = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4ef7ecef3edbbd54f238aad0fd8b7253&query=${address}`;
    request({ url, json: true }, (error, { body }) => {
        console.log(body)
        if (error) {
            callback('Ingrese Ciudad!', undefined)
        } else {
            callback(undefined, body)
        }
    })
}
module.exports = weatherstack