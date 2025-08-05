import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const UseFetchCurrentWeather = (coords: { lat: number; lon: number } | null) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
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
        setError("Failed to fetch current weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords]);

  return { weatherData, loading, error };
};

export default UseFetchCurrentWeather;
