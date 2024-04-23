import React from 'react';

function WeatherCard({ data }) {
    return (
        <div className="weather-card">
            <h2>City {data?.list[0]?.name}</h2>
            <p>Temperature: {data?.list[0]?.main?.temp}°C</p>
            <p>Weather: {data?.list[0]?.weather[0]?.description}</p>
            <p>Humidity: {data?.list[0]?.main?.humidity}%</p>
        </div>
    );
}

export default WeatherCard;

