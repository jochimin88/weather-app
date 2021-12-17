import React, {useState} from 'react';
import './App.css';

function App() {
    const apiKey = 'f5f11d854d3c313d7bb74e137e7f9491'
    const [weatherData, setWeather] = useState([{}]);
    const [city, setCity] = useState("");

    const getWeather = (event) => {
    if (event.key === 'Enter') {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(
            response => response.json()
        ).then(
            data => {
            setWeather(data);
            setCity("");
            }
        )
    }
    }
    return (
<div className='container'>
    <input
            className='input'
            placeholder='Enter the city..'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={getWeather}
    />
    {typeof weatherData.main === 'undefined' ? (
        <div>
            <p> Welcome to weather app! Enter in a city to get the weather of.</p>
        </div>
    ) : (
        <div className='weather-data'>
            <div  >
            <p className='city'> {weatherData.name} </p>
            <p className='temp'> {weatherData.main.temp} °C </p>
            <p className='weather'> {weatherData.weather[0].main} </p>
            <p className='wind'> {weatherData.wind.speed} m/s </p>
            <p className='temp_min'> Min: {weatherData.main.temp_min} °C </p>
            <p className='temp_max'> Max: {weatherData.main.temp_max} °C </p>
            <p className='humidity'> Humidity: {weatherData.main.humidity} % </p>
            <p className='pressure'> Pressure: {weatherData.main.pressure} hPa </p>
            <p className='sunrise'> Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} </p>
            <p className='sunset'> Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()} </p>
            <p className='country'> Country: {weatherData.sys.country} </p>
           <p className='description'> Description: {weatherData.weather[0].description} </p>
            </div>
            </div>
            )}
</div>
    );
}

export default App;
