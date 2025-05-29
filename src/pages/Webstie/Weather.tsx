import React, { useState } from "react";
import fetchWeatherData from "../../hooks/UseFetchCurrentWeather";
import CurrentWeatherForecast from "../../components/Website/CurrentWeatherForecast";

const Weather = () => {
  const { weatherData } = fetchWeatherData();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center gap-y-4 mb-10">
        <h2 className="text-2xl select-none">Search your city below</h2>
        <div className="w-full max-w-sm relative">
          <input
            className="w-full bg-transparent placeholder:text-black text-black text-sm border border-black rounded-md px-3 py-2 focus:outline-none focus:border-black shadow-sm focus:shadow"
            placeholder="Type here..."
          />
        </div>
      </div>
      <div className="border-2 py-20 w-full">
        <CurrentWeatherForecast />
      </div>
    </div>
  );
};

export default Weather;
