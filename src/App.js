import React, { useState } from 'react'; // Import React
import './App.css';
import Search from './Components/Search/Search';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import Forecast from './Components/Forecast/Forecast';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const onSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    const forcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse })

      }).catch((err) => console.log(err));
  }
  return (
    <div className="container ">
      <h1 style={{ textAlign: 'center' }}>Weather Forecast</h1>
      <Search onSearchChange={onSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
