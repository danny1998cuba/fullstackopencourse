import React from "react";

const WeatherData = ({ data, capitalName }) => {
  if (!data) return null;
  return (
    <div>
      <h2>Wather in {capitalName}</h2>
      <div>Temperature {data.main.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt=""
      />
      <div>Wind {data.wind.speed} m/s</div>
    </div>
  );
};

export default WeatherData;
