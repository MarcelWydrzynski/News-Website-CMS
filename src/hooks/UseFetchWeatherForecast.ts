import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const useFetchWeeklyForecast = (coords: { lat: number; lon: number } | null) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (!coords) return;

    const fetchForecast = async () => {
      try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            lat: coords.lat,
            lon: coords.lon,
            units: "metric",
            appid: API_KEY,
          },
        });
        setForecastData(res.data.list);
      } catch (err) {
        console.error("Forecast fetch error", err);
      }
    };

    fetchForecast();
  }, [coords]);

  return { forecastData };
};

export default useFetchWeeklyForecast;
