
const fetch = require("node-fetch");

require("dotenv").config()

// const url = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=${process.env.APPID}`;


async function getWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${process.env.APPID}`;

    let data = await fetch(url, {method: 'GET'})
    return await data.json();
}

module.exports = getWeather;

// const request = require("request");
// const {promisify} = require("util");
// const promisifiedRequest = promisify(request);

// require("dotenv").config()

// const getWeather = async () => {
//     let data = await promisifiedRequest({
//         uri: `https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=${process.env.APPID}`,
//         json: true
//     });
//     return data.body; // Return the data rather than console.log
// }

// module.exports = getWeather;