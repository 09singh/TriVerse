import React, { useState, useEffect } from 'react';
import './wether.css';

export default function WeatherPage({ navigateTo }) {
  const [city, setCity] = useState('Mumbai');
  const [cityInput, setCityInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = '1f7a3eec2dbaf45d1af9a389d70e0471'; // Replace with your OpenWeatherMap API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) throw new Error('City not found');
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (cityInput.trim()) {
      setCity(cityInput.trim());
      fetchWeather(cityInput.trim());
      setCityInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>

      <div className="weather-container">
        <div className="weather-content">
          <button onClick={() => navigateTo('home')} className="back-button">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            </svg>
            Back to Home
          </button>

          <div className="header">
            <h1>Weather Dashboard</h1>
            <p>Live weather conditions worldwide</p>
          </div>

          <div className="search-box">
            <div className="search-form">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name..."
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">
                Search
              </button>
            </div>
          </div>

          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading weather data...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <p className="error-title">Error: {error}</p>
              <p className="error-text">Please check the city name and try again.</p>
            </div>
          )}

          {!loading && !error && weather && (
            <div className="weather-display">
              <div className="main-cards">
                <div className="card location-card">
                  <p className="card-label">Location</p>
                  <p className="card-value">{weather?.name}</p>
                  <p className="card-subtitle">{weather?.sys?.country}</p>
                </div>

                <div className="card temp-card">
                  <p className="card-label">Temperature</p>
                  <p className="card-value">{weather?.main?.temp?.toFixed(1)}°C</p>
                  <p className="card-subtitle">Feels like {weather?.main?.feels_like?.toFixed(1)}°C</p>
                </div>

                <div className="card condition-card">
                  <p className="card-label">Conditions</p>
                  <p className="card-value condition-text">{weather?.weather?.[0]?.description}</p>
                  <p className="card-subtitle">Humidity: {weather?.main?.humidity}%</p>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-card">
                  <p className="info-label">Wind Speed</p>
                  <p className="info-value">{weather?.wind?.speed} m/s</p>
                </div>
                <div className="info-card">
                  <p className="info-label">Pressure</p>
                  <p className="info-value">{weather?.main?.pressure} hPa</p>
                </div>
                <div className="info-card">
                  <p className="info-label">Visibility</p>
                  <p className="info-value">{(weather?.visibility / 1000)?.toFixed(1)} km</p>
                </div>
                <div className="info-card">
                  <p className="info-label">Clouds</p>
                  <p className="info-value">{weather?.clouds?.all}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}