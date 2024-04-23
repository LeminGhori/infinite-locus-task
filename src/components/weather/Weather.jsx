import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import './weather.css';

// Weather component
function Weather() {
    // State variables
    const [city, setCity] = useState(''); // Stores the entered city name
    const [weatherData, setWeatherData] = useState(null); // Stores weather data fetched from API
    const [error, setError] = useState(''); // Stores any error occurred during fetching weather data
    const [cityValid, setCityValid] = useState(true); // Indicates if the entered city is valid
    const [btnDisabled, setBtnDisabled] = useState(false);

    // Function to fetch weather data from API
    const fetchWeatherData = async () => {
        const REACT_APP_WEATHER_API_KEY = '439d4b804bc8187953eb36d2a8c26a02';
        setBtnDisabled(true);
        try {
            const response = await axios.post(
                `https://openweathermap.org/data/2.5/find?callback=jQuery34009709281463855797_1713873250899&q=${city}&type=like&sort=population&cnt=30&appid=${REACT_APP_WEATHER_API_KEY}&_=1713873250900`
            );
            const jsonString = response?.data?.substring(response?.data?.indexOf('(') + 1, response?.data?.lastIndexOf(')'));
            // Parse the JSON data
            const jsonData = JSON.parse(jsonString);
            // Update weather data state
            setWeatherData(jsonData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Enter Valid City Name');
        } finally {
            // Regardless of success or failure, enable the button again
            setBtnDisabled(false);
        }
    };

    // Function to handle input change in city input field
    const handleInputChange = (e) => {
        const inputCity = e.target.value;
        // Update city state with the entered value
        setCity(inputCity);
        // Check if the entered city is empty
        if (inputCity.trim() === '') {
            // If empty, set city validity to false and display error message
            setCityValid(false);
            setError('Please enter a city.');
        } else {
            // If not empty, set city validity to true and clear any error message
            setCityValid(true);
            setError('');
        }
    };

    // Function to handle onBlur event in city input field
    const handleBlur = (e) => {
        // Check if the entered city is not empty
        const isValid = e.target.value.trim() !== '';
        // Update city validity state
        setCityValid(isValid);
        // Set error message if city is empty
        if (!isValid) {
            setError('Please enter a city.');
        } else {
            setError('');
        }
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the entered city is valid
        if (cityValid) {
            // If valid, fetch weather data
            fetchWeatherData();
        }
    };

    // Render JSX
    return (
        <div className="App">
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={!cityValid ? 'error' : ''}
                />
                <button type="submit" disabled={btnDisabled}>Get Weather</button>
            </form>
            {/* Display error message if any */}
            {error && <p className="error">{error}</p>}
            {/* Render WeatherCard component if weather data is available */}
            {weatherData && !btnDisabled && <WeatherCard data={weatherData} />}
        </div>
    );
}

export default Weather;
