// hooks/useFetchWeeklyForecast.ts
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const useFetchWeeklyForecast = () => {
  const [forecastData, setForecastData] = useState<any[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${apiKey}&units=metric`);
      const json = await res.json();
      setForecastData(json.list);
    };

    fetchForecast();
  }, []);

  return { forecastData };
};

export default useFetchWeeklyForecast;
