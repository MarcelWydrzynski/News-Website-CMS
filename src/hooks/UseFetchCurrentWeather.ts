import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const useFetchCurrentWeather = (coords: { lat: number; lon: number } | null) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            lat: coords.lat,
            lon: coords.lon,
            units: "metric",
            appid: API_KEY,
          },
        });
        setWeatherData(res.data);
      } catch (err) {
        console.error("Current weather error", err);
      }
    };

    fetchWeather();
  }, [coords]);

  return { weatherData };
};

export default useFetchCurrentWeather;
