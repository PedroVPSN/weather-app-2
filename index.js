//import handlebars and path
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
//Tell express to use this folder
//Tell express that this path is static content for the client
//Use path to join these tow paths

const getWeatherFunction = require("./lib/getWeather"); // Import the getWeather function

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs' 
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {   
    res.render('index');
});

app.get('/about', (req, res) =>{
    res.render('about')
});

app.get('/wind', (req, res) =>{
    // let location = req.body.location;
    // let data = await getWeather(location);
    // let wind = data.wind.speed;
    res.render('windspeed');
});

app.post('/wind', async(req, res) => {
    let location = req.body.location;
    console.log(location)
    let data = await getWeatherFunction.getWeather(location); // data will be the weather information
    let wind = data.wind.speed;
    res.render('windspeed', {data: {location, wind}});
});
app.get('/future', (req, res) =>{
    // let location = req.body.location;
    // let data = await getWeather(location);
    // let wind = data.wind.speed;
    res.render('predictedWeather');
});

app.post('/future', async(req, res) => {
    let location = req.body.location;
    let data = await getWeatherFunction.predictedWeather(location); // data will be the weather information
    console.log(location)
    let temp = data.list[0].main.temp;
    res.render('predictedWeather', {data: {location, temp}});
});

app.post('/', async(req, res) => {
    let location = req.body.location;
    let data = await getWeatherFunction.getWeather(location); // data will be the weather information
    let temp = `${Math.ceil((data.main.temp))} °C`;
    let humidity = data.main.humidity;
    let condition = data.weather[0].description;
    let feels = `${Math.ceil((data.main.feels_like))} °C`;
    let weatherIcon = data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    
    // let temp = `${Math.floor((data.main.temp))} °C`
    // let loc = `${(data.name)}`
    // res.render('index', {temp, loc, cond});
    // return data.main.temp
    res.render('index', {data: {location, temp, humidity, condition, feels}, iconUrl});
});


app.listen(3000, () => {
    console.log('server listening on port 3000');
});