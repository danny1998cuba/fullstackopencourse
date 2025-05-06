import React from "react";
import { useEffect } from "react";
import { getWeather } from "./services/weather";
import { useState } from "react";
import WeatherData from "./WeatherData";

const CountryView = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (country) {
      getWeather(country.capital[0])
        .then((res) => setWeatherData(res.data))
        .catch(() => setWeatherData(null));
    }
  }, [country]);

  if (!country) return null;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>

      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((l) => (
          <li key={l}>{country.languages[l]}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />

      <WeatherData data={weatherData} capitalName={country.capital[0]} />
    </div>
  );
};

export default CountryView;
