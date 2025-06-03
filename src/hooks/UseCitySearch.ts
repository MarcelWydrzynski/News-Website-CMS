import { useState, useEffect } from "react";
import axios from "axios";

export type CitySuggestion = {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
};

export default function useCitySearch(query: string) {
  const [results, setResults] = useState<CitySuggestion[]>([]);

  useEffect(() => {
    if (!query) return setResults([]);

    const controller = new AbortController();

    const fetchCities = async () => {
      try {
        const res = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
          params: {
            q: query,
            limit: 10,
            appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
          },
          signal: controller.signal,
        });

        // Filter: only one result per unique city name
        const seen = new Set();
        const uniqueCities = res.data.filter((item: any) => {
          const key = item.name.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        const cities: CitySuggestion[] = uniqueCities.map((item: any) => ({
          name: item.name,
          state: item.state,
          country: item.country,
          lat: item.lat,
          lon: item.lon,
        }));

        setResults(cities);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error(err);
        setResults([]);
      }
    };

    fetchCities();
    return () => controller.abort();
  }, [query]);

  return { results };
}
