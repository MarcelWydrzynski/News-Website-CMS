import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const UseFetchWeeklyForecast = (coords: { lat: number; lon: number } | null) => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coords) return;

    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
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
        setError("Failed to fetch forecast");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [coords]);

  return { forecastData, loading, error };
};

export default UseFetchWeeklyForecast;
