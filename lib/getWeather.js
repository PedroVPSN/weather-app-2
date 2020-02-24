
const fetch = require("node-fetch");

require("dotenv").config()

async function getWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${process.env.APPID}`;

    let data = await fetch(url, {method: 'GET'})
    return await data.json();
}

async function predictedWeather(location, days) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${process.env.APPID}`;
    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
    let data = await fetch(url, {method: 'GET'})
    return await data.json();
}

module.exports = {
    getWeather, 
    predictedWeather};