import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const useFetchWeatherData = () => {
  const [weatherData, setWeatherData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={${apiKey}}`
        );
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return { weatherData };
};

export default useFetchWeatherData;
