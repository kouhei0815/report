import React from "react";

const WeatherInfo = ({ weather, stats }) => (
  <div>
    <p className="weather-info">天気: {weather.weather[0].main}</p>
    <p className="weather-info">気温: {weather.main.temp}°C</p>
    <p className="weather-info">{stats}</p>
  </div>
);

export default WeatherInfo;
